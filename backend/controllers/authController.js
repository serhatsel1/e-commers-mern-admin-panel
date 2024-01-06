import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

const generateRandomAvatar = () => {
  const randomAvatar = Math.floor(Math.random() * 71);
  return `https://i.pravatar.cc/300?img=${randomAvatar}`;
};

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingEmail = await User.findOne({ email });

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
      avatar: generateRandomAvatar(),
    });

    await newUser.save();

    res.status(200).json({
      newUser,
    });
  } catch (error) {
    console.log("createUser-->", error);
    res.status(500).json({ message: error });
  }
};

export { createUser };
