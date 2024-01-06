import express from "express";
import productsRoute from "./productsRoute.js";
import categoryRoute from "./categoriesRoute.js";
import authRoute from "./authRoute.js";
import couponRoute from "./couponRoute.js";

const router = express.Router();

router.use("/category", categoryRoute);
router.use("/products", productsRoute);
router.use("/auth", authRoute);
router.use("/coupon", couponRoute);

export default router;
