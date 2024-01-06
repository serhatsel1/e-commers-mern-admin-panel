import express from "express";
import {
  createCategory,
  allCategories,
  getSingleCategory,
} from "../controllers/categoryControllers.js";

const router = express.Router();

router.post("/", createCategory);
router.get("/", allCategories);
router.get("/:categoryId", getSingleCategory);

export default router;
