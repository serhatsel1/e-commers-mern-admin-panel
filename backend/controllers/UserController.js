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

const deleteUser = async (req, res) => {
  try {
    const email = req.params.email;

    const user = await User.findOneAndDelete({ email });
    // await user.save();
    res.status(201).json({
      user,
    });
  } catch (error) {
    console.log("deleteUser-->", error);
    res.status(500).json({
      message: error,
    });
  }
};

export { allUsers,deleteUser };
