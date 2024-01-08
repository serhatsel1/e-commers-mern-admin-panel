import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateRandomAvatar = () => {
  const randomAvatar = Math.floor(Math.random() * 71);
  return `https://i.pravatar.cc/300?img=${randomAvatar}`;
};

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingEmail = await User.findOne({ email });
    const defaultAvatar = generateRandomAvatar();
    if (existingEmail) {
      return res.status(400).json({
        message: "Email address is already registered !",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      avatar: defaultAvatar,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_TOKEN, {
      expiresIn: "5d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 5 * 24 * 60 * 60 * 1000,
    });
    await newUser.save();

    res.status(200).json({
      newUser,
      token,
    });
  } catch (error) {
    console.log("createUser-->", error);
    res.status(500).json({ message: error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Geçersiz email veya şifre",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid);
    console.log(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Hatalı şifre",
      });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.log("login-->", error);
    res.status(500).json({ message: error });
  }
};

export { createUser, login };
