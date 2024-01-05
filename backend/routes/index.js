import express from "express";
import productsRoute from "./productsRoute.js";
import categoryRoute from "./categoriesRoute.js";


const router = express.Router();



router.use("/category", categoryRoute);
router.use("/products", productsRoute);


export default router;
