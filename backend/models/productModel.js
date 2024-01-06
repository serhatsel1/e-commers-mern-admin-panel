import mongoose from "mongoose";

const { Schema } = mongoose;

//alternatif bir şekilde oluşturma
const ReviewSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img: [
      {
        type: String,
        required: true,
      },
    ],
    price: {
      current: { type: Number, required: true },
      discount: { type: Number },
    },
    reviews: [ReviewSchema],
    description: {
      type: String,
      required: true,
    },
    colors: [
      {
        type: String,
        required: true,
      },
    ],
    sizes: [
      {
        type: String,
        required: true,
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
