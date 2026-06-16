
import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import { log } from "node:console";
import connectToDB from './database/db.js'

dotenv.config();

const PORT = process.env.PORT
const app = express()

app.use(express.json())

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