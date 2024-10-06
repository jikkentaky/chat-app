import { Router } from "express";
import { getUserInfo, login, signUp } from "../controllers/auth-controller";
import { verifyToken } from "../middleware/auth-middleware";

const authRoutes = Router();

authRoutes.post("/signup", signUp);
authRoutes.post("/login", login);
authRoutes.get("/user-info", verifyToken, getUserInfo);

export default authRoutes