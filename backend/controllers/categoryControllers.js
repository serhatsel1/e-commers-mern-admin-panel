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

const getSingleCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const singleCategory = await Category.findById(categoryId);

    // console.log("singleCategory", singleCategory);

    res.status(200).json({
      singleCategory,
    });
  } catch (error) {
    console.log("getSingleCategory-->", error);
    res.status(500).json({
      message: error,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const { name, img } = req.body;

    const category = await Category.findByIdAndUpdate(
      categoryId,
      {
        name,
        img,
      },
      { new: true }
    );
    await category.save();
    res.status(201).json({
      category,
    });
  } catch (error) {
    console.log("updateCategory-->", error);
    res.status(500).json({
      message: error,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const category = await Category.findByIdAndDelete(categoryId);
    await category.save();
    res.status(201).json({
      category,
    });
  } catch (error) {
    console.log("deleteCategory-->", error);
    res.status(500).json({
      message: error,
    });
  }
};

export {
  createCategory,
  allCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
