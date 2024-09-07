import { Router } from "express";
import { userLogin, userSignup, tokenRefresh, getTodos, logout } from "../controllers/userController.js";
import { verifyAccessToken, verifyRefreshToken } from "../middlewares/authentication.js";
const user_router = Router();

user_router.post("/signup", userSignup);
user_router.post("/login", userLogin);
user_router.get("/refresh", verifyRefreshToken, tokenRefresh)
user_router.get("/todos", verifyAccessToken, getTodos);
user_router.get("/logout",logout);
// user_router.post("/setavatar")

export default user_router;