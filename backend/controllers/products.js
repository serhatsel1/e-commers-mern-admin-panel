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
    console.log("createProduct-->", error);
    res.status(500).json({ message: error });
  }
};

const allProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      products,
    });
  } catch (error) {
    console.log("allProducts-->", error);
    res.status(500).json({
      message: error,
    });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    const singleProduct = await Product.findById(productId);

    // console.log("singleProduct", singleProduct);

    res.status(200).json({
      singleProduct,
    });
  } catch (error) {
    console.log("getSingleProduct-->", error);
    res.status(500).json({
      message: error,
    });
  }
};

export { createProduct, allProducts, getSingleProduct };
