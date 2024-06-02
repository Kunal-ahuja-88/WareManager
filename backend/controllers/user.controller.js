import asyncHandler from "express-async-handler"
import { ApiError } from "../middleware/ApiError.js";
import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken"


const registerUser = asyncHandler(async (req, res) => {
    console.log("Request body:", req.body);

    const { name, email, password } = req.body

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
    const existedUser = await User.findOne({ email })

    if (existedUser) {
        throw new ApiError(409, "User with email already exists")
    }


    const user = await User.create({
        name,
        email,
        password
    })

    const generateToken = (id) => {
        return jwt.sign({ id },
            process.env.JWT_ACCESS_SECRET_KEY,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        )
    }

    const token = generateToken(user._id)

    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none",
        secure: true
    })

    if (user) {
        const { _id, name, email, photo, phone, bio } = user
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

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
        throw new ApiError(400, "Please add email and password")
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(400, "User not found , please signup")
    }

    const passswordIsCorrect = await user.isPasswordCorrect(password)

    const token = generateToken(user._id)

    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none",
        secure: true
    })

    if (!passswordIsCorrect) {
        throw new ApiError(400, "Password is not valid")
    }


    if (user && passswordIsCorrect) {
        const { _id, name, email, photo, phone, bio } = user
        res.status(200).json({
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
        throw new ApiError(400, "Invalid email or password")
    }

})

const logoutUser = asyncHandler(async(req,res)=> {
    
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none",
        secure: true
    });
    return res.status(200).json({message : "Succesfully logged out"})
})

export {
    registerUser,
    loginUser,
    logoutUser
}