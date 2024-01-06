import Category from "../models/categoryModal.js";

const createCategory = async (req, res) => {
  const { name, img } = req.body;

  const newCategory = await Category.create(req.body);

  await newCategory.save();

  res.status(200).json({
    category,
  });
};



export {createCategory}
