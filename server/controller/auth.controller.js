import globalErrorHandler from "../middlewares/globalErrorHandler.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {errorHandler} from "../utils/errorHandler.js"

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