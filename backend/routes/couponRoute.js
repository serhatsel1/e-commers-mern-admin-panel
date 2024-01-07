import express from "express";

import {
  createCoupon,
  allCoupon,
  getSingleCouponId,
  getSingleCouponCode,
  updateCoupon,
  deleteCoupon,
} from "../controllers/couponsController.js";

const router = express.Router();

router.post("/", createCoupon);
router.get("/", allCoupon);
router.get("/:couponId", getSingleCouponId);
router.get("/code/:couponCode", getSingleCouponCode);
router.put("/:couponId", updateCoupon);
router.delete("/:couponId", deleteCoupon);

export default router;
