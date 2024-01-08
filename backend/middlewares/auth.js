import jwt from "jsonwebtoken";

import User from "../models/userModel.js";

const authenticatedmid = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(500).json({
      message: "Erişim için lütfen giriş yapınız!",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedData = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = await User.findById(decodedData.id);
    res.cookie("jwt", token, {
      httpOnly: true, // Sadece sunucu tarafından erişilebilir
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 gün geçerli
    });

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Erişim tokenı geçersizdir!",
    });
  }
};

export { authenticatedmid };
