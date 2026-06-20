import globalErrorHandler from "../middlewares/globalErrorHandler.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const getUsers = asyncHandler(async(req, res) => {
    res.status(200).json({
        message: "API route is working"
    })
})