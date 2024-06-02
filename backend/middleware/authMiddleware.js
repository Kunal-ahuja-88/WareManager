import asyncHandler from "express-async-handler"
import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { ApiError } from "./ApiError.js"

const protect = asyncHandler(async(req,res,next)=> {
    try {
        const token = req.cookies.token
        if(!token) {
            throw new ApiError(401,"Not Authorized , please login again")
        }
       
        //verifying JWT
        const verified = jwt.verify(token,process.env.JWT_ACCESS_SECRET_KEY)

        // abstracting user id from token

     const user = await User.findById(verified.id).select(
        "-password"
     )

     if(!user) {
        throw new ApiError(401,"User not found")
     }
     
     req.user=user
     next()

    } catch (error) {
        throw new ApiError(400,"User not authorized, please login")
    }
})

export default protect

