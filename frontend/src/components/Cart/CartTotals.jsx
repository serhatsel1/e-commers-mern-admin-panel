import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartProvider";

const CartTotals = () => {
  const { cartItems } = useContext(CartContext);
  const [checkedCargo, setCheckedCargo] = useState(false);

  console.log("total", cartItems);

  const cartItemTotals = cartItems.map((item) => {
    const itemTotal = item.price.newPrice * item.quantity;

    return itemTotal;
  });
  //? Toplama işlemi
  const subTotals = cartItemTotals.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  }, 0);

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
        <button className="btn btn-lg">Proceed to checkout</button>
      </div>
    </div>
  );
};

export default CartTotals;
