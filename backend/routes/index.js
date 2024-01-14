import express from "express";
import productsRoute from "./productsRoute.js";
import categoryRoute from "./categoriesRoute.js";
import authRoute from "./authRoute.js";
import couponRoute from "./couponRoute.js";
import userRoute from "./userRoute.js";
import paymentRoute from "./paymentRoute.js";
const router = express.Router();

router.use("/categories", categoryRoute);
router.use("/products", productsRoute);
router.use("/auth", authRoute);
router.use("/coupon", couponRoute);
router.use("/users", userRoute);
router.use("/payment", paymentRoute);

export default router;
