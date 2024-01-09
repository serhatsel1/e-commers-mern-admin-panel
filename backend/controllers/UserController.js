import User from "../models/userModel.js";

const allUsers = async (req, res) => {
  try {
    const Users = await User.find();

    res.status(200).json({
      Users,
    });
  } catch (error) {
    console.log("allUsers-->", error);
    res.status(500).json({
      message: error,
    });
  }
};

export { allUsers };
