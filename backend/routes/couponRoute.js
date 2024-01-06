import express from "express";

import { createCoupon } from "../controllers/couponsController.js";

const router = express.Router();

router.post("/", createCoupon);

export default router;
