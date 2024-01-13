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
    const products = await Product.find()
      .populate({
        path: "category",
        select: "name",
      })
      .populate({
        path: "reviews.user",
        select: ["name", "avatar"],
      });

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

    const singleProduct = await Product.findById(productId)
      .populate({
        path: "category",
        select: "name",
      })
      .populate({
        path: "reviews.user",
        select: ["name", "avatar"],
      });

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

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const productData = req.body;

    const product = await Product.findByIdAndUpdate(productId, productData, {
      new: true,
    });
    // await product.save();
    res.status(201).json({
      product,
    });
  } catch (error) {
    console.log("updateProduct-->", error);
    res.status(500).json({
      message: error,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    const product = await Product.findByIdAndDelete(productId);
    // await product.save();
    res.status(201).json({
      message: "Ürün silindi",
    });
  } catch (error) {
    console.log("deleteProduct-->", error);
    res.status(500).json({
      message: error,
    });
  }
};

export {
  createProduct,
  allProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
