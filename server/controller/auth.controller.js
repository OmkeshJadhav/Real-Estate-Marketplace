import globalErrorHandler from "../middlewares/globalErrorHandler.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js"
import { generateAccessToken } from "../utils/generateAccessToken.js";

export const signUp = asyncHandler(async (req, res, next) => {
    try {
        const { username, email, password } = req.body

        // Check if user already exists in db
        const isExistingUser = await User.findOne({
            $or: [{ username }, { email }]
        })

        if (isExistingUser) {
            return res.status(400).json({
                success: false,
                message: 'Username or email already exists! Please try with different username or email id.'
            })
        }

        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({ username, email, password: hashedPassword })
        await newUser.save()

        res.status(201).json({
            success: true,
            message: "User registered successfully.",
            data: {
                _id: newUser._id,
                username,
                email,
            }
        })
    } catch (error) {
        next(error)
        // next(errorHandler(550, 'Error from the function'))
    }
})

export const signIn = asyncHandler(async (req, res) => {

    const { identifier, password } = req.body;

    const user = await User.findOne({
        $or: [{ email: identifier }, { username: identifier }]
    })

    if (!user) {
        return res.status(404).json({
            success: false,
            message: `Invalid credentialsssss.`
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(401).json({
            success: false,
            message: `Invalid credentials`
        })
    }

    const accessToken = generateAccessToken(user)

    // res.cookie is more secure than storing JWT in localStorage using res.json - because JavaScript cannot access an httpOnly cookie.
    res
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 10 * 60 * 1000
            // secure: process.env.NODE_ENV === "production",
            // sameSite: "strict",
        })
        .status(200)
        .json({
            success: true,
            message: `User logged in successfully.`,
            data: {
                _id: user._id,
                username: user.username,
                email: user.email
            },
        })
})