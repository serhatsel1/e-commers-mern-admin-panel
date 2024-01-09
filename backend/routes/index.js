import express from "express";
import productsRoute from "./productsRoute.js";
import categoryRoute from "./categoriesRoute.js";
import authRoute from "./authRoute.js";
import couponRoute from "./couponRoute.js";
import userRoute from "./userRoute.js";
const router = express.Router();

router.use("/categories", categoryRoute);
router.use("/products", productsRoute);
router.use("/auth", authRoute);
router.use("/coupon", couponRoute);
router.use("/users", userRoute);

export default router;
