import PropTypes from "prop-types";
import "./ProductItem.css";
import { useState } from "react";

const PorductItem = ({ productItem, setCartItems }) => {
  const addToCart = (product) => {
    // setCartItems([...cartItems, product]); alternatif
    setCartItems((prevItems) => [...prevItems, product]);
  };

  return (
    <div className="product-item glide__slide glide__slide--active">
      <div className="product-image">
        <a href="#">
          <img src={productItem.img.singleImage} alt="" className="img1" />
          <img src={productItem.img.thumbs[1]} alt="" className="img2" />
        </a>
      </div>
      <div className="product-info">
        <a href="$" className="product-title">
          {productItem.name}
        </a>
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
        <div className="product-prices">
          <strong className="new-price">
            ${productItem.price.newPrice.toFixed(2)}
          </strong>
          <span className="old-price">
            ${productItem.price.oldPrice.toFixed(2)}
          </span>
        </div>
        <span className="product-discount">-{productItem.discount}%</span>
        <div className="product-links">
          <button onClick={() => addToCart(productItem)}>
            <i className="bi bi-basket-fill"></i>
          </button>
          <button>
            <i className="bi bi-heart-fill"></i>
          </button>
          <a href="#">
            <i className="bi bi-eye-fill"></i>
          </a>
          <a href="#">
            <i className="bi bi-share-fill"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

PorductItem.propTypes = {
  productItem: PropTypes.object,
  setCartItems: PropTypes.func,
};

export default PorductItem;