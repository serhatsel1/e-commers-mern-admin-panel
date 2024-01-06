import mongoose from "mongoose";

const { Schema } = mongoose;

const CouponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    discountPercent: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Coupon = mongoose.model("Coupon", CouponSchema);

export default Coupon;
