import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
    path: './.env'
})


const app =express();

const PORT = process.env.PORT || 5000;

 
connectDB()
.then(() => {
    app.listen(PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})