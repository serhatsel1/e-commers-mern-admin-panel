import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  console.log("CArtItems", cartItems);

  const addToCart = (product) => {
    // setCartItems([...cartItems, product]); alternatif
    setCartItems((prevItems) => [...prevItems, product]);
  };
  return (
    <CartContext.Provider
      value={{
        addToCart,
        cartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

CartProvider.propTypes = {
  children: PropTypes.node,
};
