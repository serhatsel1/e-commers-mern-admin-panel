import express from "express";
import {
  createProduct,
  allProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.js";

const router = express.Router();

router.post("/", createProduct);
router.get("/", allProducts);
router.get("/:productId", getSingleProduct);
router.put("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);

export default router;
