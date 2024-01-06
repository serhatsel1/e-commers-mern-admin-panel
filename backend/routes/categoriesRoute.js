import express from "express";
import {
  createCategory,
  allCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryControllers.js";

const router = express.Router();

router.post("/", createCategory);
router.get("/", allCategories);
router.get("/:categoryId", getSingleCategory);
router.put("/:categoryId", updateCategory);
router.delete("/:categoryId", deleteCategory);

export default router;
