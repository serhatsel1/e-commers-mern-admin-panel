import PropTypes from "prop-types";
import "./ProductItem.css";
import { useContext } from "react";
import { CartContext } from "../../context/CartProvider";
import { Link, useNavigate } from "react-router-dom";

const PorductItem = ({ productItem }) => {
  const { addToCart, cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const filteredCart = cartItems.find(
    (cartItem) => cartItem._id === productItem._id
  );
  const currentPrice = productItem.price.current;
  const discountPercent = productItem.price.discount;

  const newPrice = ((100 - discountPercent) / 100) * currentPrice;
  // console.log(cartItems);

  return (
    <div className="product-item glide__slide glide__slide--active">
      <div className="product-image">
        <a href="#">
          <img style={{height:"300px"}} src={productItem.img[0]} alt="loading" className="img1" />
          <img src={productItem.img[1]} alt="loading" className="img2" />
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

        <hr />
        <div className="product-prices">
          <strong className="new-price">
            ${productItem.price.current.toFixed(2)}
          </strong>
          <span className="old-price">${newPrice.toFixed(2)}</span>
        </div>
        <span className="product-discount">-{productItem.price.discount}%</span>
        <div className="product-links">
          <button
            onClick={() => addToCart({ ...productItem, price: newPrice })}
            disabled={filteredCart}
          >
            <i className="bi bi-basket-fill"></i>
          </button>
          <button>
            <i className="bi bi-heart-fill"></i>
          </button>
          <div>
            <Link to={`product/${productItem._id}`} className="product-link">
              <i className="bi bi-eye-fill"></i>
            </Link>
          </div>
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
