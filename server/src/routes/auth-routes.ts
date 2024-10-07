import { Router } from "express";
import { getUserInfo, login, logOut, signUp, updateUserInfo } from "../controllers/auth-controller";
import { verifyToken } from "../middleware/auth-middleware";

const authRoutes = Router();

authRoutes.post("/signup", signUp);
authRoutes.post("/login", login);
authRoutes.get("/user-info", verifyToken, getUserInfo);
authRoutes.patch("/update-user-info", verifyToken, updateUserInfo);
authRoutes.post("/logout", verifyToken, logOut);

export { authRoutes }