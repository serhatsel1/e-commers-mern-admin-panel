import Coupon from "../models/couponModel.js";

const createCoupon = async (req, res) => {
  try {
    const { code, discountPercent } = req.body;

    const existingCoupon = await Coupon.findOne({ code });

    if (existingCoupon) {
      return res.status(500).json({
        message: "Böyle bir kupon zaten var !",
      });
    }

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

const allCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.find();

    res.status(200).json({
      coupon,
    });
  } catch (error) {
    console.log("allCoupon-->", error);
    res.status(500).json({
      message: error,
    });
  }
};

const getSingleCouponId = async (req, res) => {
  try {
    const couponId = req.params.couponId;

    const singlecoupon = await Coupon.findById(couponId);

    // console.log("singlecoupon", singlecoupon);
    if (!singlecoupon) {
      return res.status(400).json({
        message: "Geçersiz kupon",
      });
    }

    res.status(200).json({
      singlecoupon,
    });
  } catch (error) {
    console.log("getSingleCoupon-->", error);
    res.status(500).json({
      message: error,
    });
  }
};

const getSingleCouponCode = async (req, res) => {
  try {
    const couponCode = req.params.couponCode;

    const singlecoupon = await Coupon.findOne({ code: couponCode });

    // console.log("singlecoupon", singlecoupon);
    if (!singlecoupon) {
      return res.status(400).json({
        message: "Geçersiz kupon",
      });
    }
    const { discountPercent } = singlecoupon;
    res.status(200).json({
      discountPercent,
    });
  } catch (error) {
    console.log("getSingleCoupon-->", error);
    res.status(500).json({
      message: error,
    });
  }
};

const updateCoupon = async (req, res) => {
  try {
    const couponId = req.params.couponId;
    const { code, discountPercent } = req.body;

    const coupon = await Coupon.findByIdAndUpdate(
      couponId,
      {
        code,
        discountPercent,
      },
      { new: true }
    );
    await coupon.save();
    res.status(201).json({
      coupon,
    });
  } catch (error) {
    console.log("updateCoupon-->", error);
    res.status(500).json({
      message: error,
    });
  }
};

const deleteCoupon = async (req, res) => {
  try {
    const couponId = req.params.couponId;

    const coupon = await Coupon.findByIdAndDelete(couponId);
    await coupon.save();
    res.status(201).json({
      coupon,
    });
  } catch (error) {
    console.log("deleteCoupon-->", error);
    res.status(500).json({
      message: error,
    });
  }
};

export {
  createCoupon,
  allCoupon,
  getSingleCouponId,
  getSingleCouponCode,
  updateCoupon,
  deleteCoupon,
};
