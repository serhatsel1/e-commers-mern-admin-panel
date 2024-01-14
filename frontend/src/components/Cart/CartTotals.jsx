import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartProvider";
import { message } from "antd";
import { loadStripe } from "@stripe/stripe-js";

const CartTotals = () => {
  const stripePublicKey = import.meta.env.VITE_API_STRIPE_PUBLIC_KEY;
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { cartItems } = useContext(CartContext);
  const [checkedCargo, setCheckedCargo] = useState(false);
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  // console.log("total", cartItems);

  const cartItemTotals = cartItems.map((item) => {
    const itemTotal = item.price * item.quantity;

    return itemTotal;
  });
  //! Toplama işlemi
  const subTotals = cartItemTotals.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  }, 0);

  const handlePayment = async () => {
    if (!user) {
      message.info("Ödeme yapmak için lütfen giriş yapınız");
    }
    const body = {
      products: cartItems,
      user: user,
      cargoFee: checkedCargo ? cargoFee : 0,
    };

    try {
      const stripe = await loadStripe(stripePublicKey);

      const res = await fetch(`${apiUrl}/api/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        message.error("Ödeme işlemi yapılamadı !");
        return;
      }

      const session = await res.json();
      console.log("session", session);
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.log(error);
    }
    console.log(body);
  };

  const cargoFee = 15.69;
  const cartTotal = checkedCargo ? cargoFee + subTotals : subTotals;
  console.log("checkedCargo", checkedCargo);
  return (
    <div className="cart-totals">
      <h2>Cart totals</h2>
      <table>
        <tbody>
          <tr className="cart-subtotal">
            <th>Subtotal</th>
            <td>
              <span id="subtotal">${subTotals.toFixed(2)}</span>
            </td>
          </tr>
          <tr>
            <th>Shipping</th>
            <td>
              <ul>
                <li>
                  <label>
                    Fast Cargo: ${cargoFee}
                    <input
                      type="checkbox"
                      id="fast-cargo"
                      onChange={() => setCheckedCargo(!checkedCargo)}
                      checked={checkedCargo}
                    />
                  </label>
                </li>
                <li>
                  <a href="#">Change Address</a>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>Total</th>
            <td>
              <strong id="cart-total">${cartTotal.toFixed(2)}</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="checkout">
        <button className="btn btn-lg" onClick={handlePayment}>
          Proceed to checkout
        </button>
      </div>
    </div>
  );
};

export default CartTotals;
