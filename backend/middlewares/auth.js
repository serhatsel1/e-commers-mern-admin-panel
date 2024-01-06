import jwt from "jsonwebtoken";

import User from "../models/userModel";

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
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Erişim tokenı geçersizdir!",
    });
  }
};

export { authenticatedmid };
