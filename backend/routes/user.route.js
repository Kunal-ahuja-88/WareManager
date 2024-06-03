import { Router } from "express";
import { loginUser, registerUser,logoutUser , getUser ,loginStatus , updateUser,changePassword, forgotPassword} from "../controllers/user.controller.js";
import protect from "../middleware/authMiddleware.js"
const router = Router();


router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/logout",logoutUser)
router.get("/getuser",protect,getUser)
router.get("/loggedin",loginStatus)
router.patch("/update",protect,updateUser)
router.patch("/changepassword",protect,changePassword);
router.post("/forgotpassword",forgotPassword);


export default router