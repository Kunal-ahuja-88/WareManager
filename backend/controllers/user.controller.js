import asyncHandler from "express-async-handler"
import { ApiError } from "../middleware/ApiError.js";
import {User} from "../models/user.model.js"
import jwt from "jsonwebtoken"

const registerUser = asyncHandler(async (req, res) => {
    console.log("Request body:", req.body);

   const {name,email,password} = req.body

   console.log("Name:", name);
   console.log("Email:", email);
   console.log("Password:", password);

   if (!req.body) {
    throw new ApiError(400, "Request body is missing");
}
    
if ([name, email, password].some(field => !field || field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
}
 
 
   //check if user already exists
   const existedUser = await User.findOne({email})

   if(existedUser) {
    throw new ApiError(409,"User with email already exists")
   }


   const user = await User.create({
    name,
    email,
    password
   })

   const generateToken = (id) => {
    return jwt.sign({id},
        process.env.JWT_ACCESS_SECRET_KEY,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
   }
  
   const token = generateToken(user._id)

   if(user) {
    const {_id,name,email,photo,phone,bio} = user
    res.status(201).json({
        _id,
        name,
        email,
        photo,
        phone,
        bio,
        token
    })

    }

    else {
        throw new ApiError(400, "Invalid User data")
    }
   










});


export {
    registerUser
}