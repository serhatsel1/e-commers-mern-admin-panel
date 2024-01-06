import express from "express";
import { createUser, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", createUser);
router.get("/login", login);

export default router;