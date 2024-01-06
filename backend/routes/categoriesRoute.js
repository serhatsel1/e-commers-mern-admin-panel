import express from "express";
import {
  createCategory,
  allCategories,
} from "../controllers/categoryControllers.js";

const router = express.Router();

router.post("/", createCategory).get("/", allCategories);

export default router;
