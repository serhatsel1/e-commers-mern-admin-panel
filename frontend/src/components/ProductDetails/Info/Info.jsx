import PropTypes from "prop-types";

import "./Info.css";
import { useContext, useRef } from "react";
import { CartContext } from "../../../context/CartProvider";

const Info = ({ productData }) => {
  const { addToCart, cartItems } = useContext(CartContext);
  const quantityRef = useRef();
  const currentPrice = productData?.singleProduct?.price.current;
  const discountPercent = productData?.singleProduct?.price?.discount;
  const filteredCart = cartItems.find(
    (cartItem) => cartItem?._id === productData?.singleProduct?._id
  );

  const ratings =
    productData?.singleProduct?.reviews?.map((review) => review.rating) || [];

  const ratingCount = ratings.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  }, 0);

  const averageRating = ratingCount / ratings.length;

  console.log(averageRating, "ratingCount");

  console.log("productData", productData);
  const newPrice = ((100 - discountPercent) / 100) * currentPrice;
  // console.log("Info-->", productData.singleProduct);
  // console.log("Info quantityRef-->", quantityRef);
  return (
    <div className="product-info">
      <h1 className="product-title">{productData?.singleProduct?.name}</h1>
      <div className="product-review">
        {averageRating ? <h4>{averageRating.toFixed(1)} </h4> : ""}
        {averageRating ? (
          <ul className="product-star">
            <li>
              <i className="bi bi-star-fill"></i>
            </li>
            <li>
              <i className="bi bi-star-fill"></i>
            </li>
            <li>
              <i className="bi bi-star-fill"></i>
            </li>
            <li>
              <i className="bi bi-star-fill"></i>
            </li>
            <li>
              <i className="bi bi-star-half"></i>
            </li>
          </ul>
        ) : null}
        <span>
          {productData?.singleProduct?.reviews?.length > 0 ? (
            <span>{productData?.singleProduct?.reviews?.length} reviews</span>
          ) : (
            <span>{productData?.singleProduct?.reviews?.length} review</span>
          )}
        </span>
      </div>
      <div className="product-price">
        <s className="old-price">
          ${productData?.singleProduct?.price?.current?.toFixed(2)}
        </s>
        <strong className="new-price">${newPrice.toFixed(2)}</strong>
      </div>
      <p
        className="product-description"
        dangerouslySetInnerHTML={{
          __html: productData?.singleProduct?.description,
        }}
      ></p>
      <form className="variations-form">
        <div className="variations">
          <div className="colors">
            <div className="colors-label">
              <span>Color</span>
            </div>
            <div className="colors-wrapper">
              {productData?.singleProduct?.colors.map((color, i) => (
                <div key={i} className="color-wrapper">
                  <label style={{ background: `#${color}` }}>
                    <input type="radio" name="product-color" />
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="values">
            <div className="values-label">
              <span>Size</span>
            </div>
            <div className="values-list">
              {productData?.singleProduct?.sizes.map((size, i) => (
                <span key={i}>{size.toUpperCase()} </span>
              ))}
            </div>
          </div>
          <div className="cart-button">
            <input
              type="number"
              defaultValue="1"
              min="1"
              id="quantity"
              ref={quantityRef}
            />
            <button
              className="btn btn-lg btn-primary"
              id="add-to-cart"
              type="button"
              disabled={filteredCart}
              onClick={() =>
                addToCart({
                  ...productData?.singleProduct,
                  price: newPrice,
                  quantity: parseInt(quantityRef.current.value),
                })
              }
            >
              Add to cart
            </button>
          </div>
          <div className="product-extra-buttons">
            <a href="#">
              <i className="bi bi-globe"></i>
              <span>Size Guide</span>
            </a>
            <a href="#">
              <i className="bi bi-heart"></i>
              <span>Add to Wislist</span>
            </a>
            <a href="#">
              <i className="bi bi-share"></i>
              <span>Share this Product</span>
            </a>
          </div>
        </div>
      </form>
      <div className="divider"></div>
      <div className="product-meta">
        <div className="product-sku">
          <span>SKU:</span>
          <strong>BE45VGRT</strong>
        </div>
        <div className="product-categories">
          <span>Categories:</span>
          <strong>Pants , Women</strong>
        </div>
        <div className="product-tags">
          <span>Tags:</span>
          <a href="#">black</a>,<a href="#">white</a>
        </div>
      </div>
    </div>
  );
};

Info.propTypes = {
  productData: PropTypes.object,
};

export default Info;
