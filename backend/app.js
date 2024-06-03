import express from "express"
import cors from "cors"
import userRoute from "./routes/user.route.js"
import multer from 'multer';
import cookieParser from "cookie-parser";

const app =express();
const upload = multer();



app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({ extended: true }));

app.use(upload.none());

app.use(express.static("public"))
app.use(cookieParser())

app.use("/api/v1/users",userRoute)

app.get("/",(req,res)=> {
    res.send("Home Page")
})

export {app}