import express from "express";
import { allUsers } from "../controllers/UserController.js";

const router = express.Router();

router.get("/", allUsers);

export default router;
