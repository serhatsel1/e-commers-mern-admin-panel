import PropTypes from "prop-types";
import { useContext } from "react";
import { CartContext } from "../../context/CartProvider";

const CartItem = ({ cartItem }) => {
  const { removeFromCart } = useContext(CartContext);
  console.log("cartItem", cartItem);

  return (
    <tr className="cart-item">
      <td></td>
      <td className="cart-image">
        <img style={{width:"60px",height:"75px"}} src={cartItem.img} alt="loading" />
        <i
          className="bi bi-x delete-cart"
          onClick={() => removeFromCart(cartItem._id)}
        ></i>
      </td>
      <td>{cartItem.name}</td>
      <td>{cartItem?.price?.toFixed(2)}</td>
      <td className="product-quantity">{cartItem?.quantity}</td>
      <td className="product-subtotal">
        ${(cartItem?.price * cartItem?.quantity).toFixed(2)}
      </td>
    </tr>
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.object,
};

export default CartItem;
