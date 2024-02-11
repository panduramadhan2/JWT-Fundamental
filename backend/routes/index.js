import express from "express";
import { Login, Logout, Register, getUsers } from "../controllers/Users.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get("/users", verifyToken, getUsers);
// router.get("/users", getUsers);
router.post("/users", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

export default router;
