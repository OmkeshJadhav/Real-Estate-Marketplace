import globalErrorHandler from "../middlewares/globalErrorHandler.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/user.model.js";

export const signUp = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    const newUser = new User({ username, email, password })
    await newUser.save()

    res.status(201).json({
        success: true,
        message: "User registered successfully.",
        data: {
            // _id: user._id,
            username,
            email
        }
    })
})