import Category from "../models/categoryModal.js";

const createCategory = async (req, res) => {
  try {
    const { name, img } = req.body;

    const newCategory = await Category.create(req.body);

    await newCategory.save();

    res.status(200).json({
      newCategory,
    });
  } catch (error) {
    console.log("createCategory-->", error);
    res.status(500).json({ message: error });
  }
};

const allCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      categories,
    });
  } catch (error) {
    console.log("allCategories-->", error);
    res.status(500).json({
      message: error,
    });
  }
};

export { createCategory, allCategories };
