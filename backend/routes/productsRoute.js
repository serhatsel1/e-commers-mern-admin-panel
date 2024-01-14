import express from "express";
import {
  createProduct,
  allProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
} from "../controllers/products.js";

const router = express.Router();

  router.post("/", createProduct);
router.get("/", allProducts);
router.get("/:productId", getSingleProduct);
router.put("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);
router.get("/search/:productName", searchProduct);

export default router;
