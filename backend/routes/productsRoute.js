import express from "express";
import {
  createProduct,
  allProducts,
  getSingleProduct,
} from "../controllers/products.js";

const router = express.Router();

router.post("/", createProduct);
router.get("/", allProducts);
router.get("/:productId", getSingleProduct);

export default router;
