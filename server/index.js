
import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import { log } from "node:console";
dotenv.config();

const PORT = process.env.PORT
const app = express()

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Failed to connect to mongoDB', err)
    }
    )

app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})