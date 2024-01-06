import Coupon from "../models/couponModel.js";

const createCoupon = async (req, res) => {
  try {
    const { code, discountPercent } = req.body;

    const newCoupon = await Coupon.create(req.body);

    await newCoupon.save();

    res.status(200).json({
      newCoupon,
    });
  } catch (error) {
    console.log("createCoupon-->", error);
    res.status(500).json({ message: error });
  }
};

export { createCoupon };
