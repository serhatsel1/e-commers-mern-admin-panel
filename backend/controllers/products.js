import Product from "../models/productModel.js";

const createProduct = async (req, res) => {
  try {
    const product = req.body;

    const newProduct = await Product.create(product);

    await newProduct.save();

    res.status(200).json({
      newProduct,
    });
  } catch (error) {
    console.log("createCategory-->", error);
    res.status(500).json({ message: error });
  }
};

export { createProduct };
