import {app} from "./app.js"
import dotenv from "dotenv"
import connectDB from "./db/index.js";



dotenv.config({
    path: './.env'
})



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