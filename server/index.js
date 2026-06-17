
import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import { log } from "node:console";
import connectToDB from './database/db.js'
import globalErrorHandler from "./middlewares/globalErrorHandler.js";

import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"

dotenv.config();

const PORT = process.env.PORT
const app = express()

app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.use(globalErrorHandler)

const startServer = async () => {
    try {
        // connect to database 
        await connectToDB()

        // listen to the server
        app.listen(PORT, () => {
            console.log(`App is listening on PORT ${PORT}`);
        });
    } catch (error) {
        console.error("Server start failed -> ", error);
    }
}

startServer()