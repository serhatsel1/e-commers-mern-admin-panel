import express from "express";
import { allUsers, deleteUser } from "../controllers/UserController.js";

const router = express.Router();

router.get("/", allUsers);
router.delete("/:email", deleteUser);

export default router;
