import { useContext, useState } from "react";
import { message } from "antd";
import { CartContext } from "../../context/CartProvider";

const CartCoupon = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [couponCode, setCouponCode] = useState("");
  const { cartItems, setCartItems } = useContext(CartContext);

  const applyCoupon = async () => {
    if (couponCode.trim().length === 0) {
      message.warning("Kupon kodu girmediniz !");
      return;
    }
    try {
      const res = await fetch(`${apiUrl}/api/coupon/code/${couponCode}`);
      if (res.ok) {
        const resData = await res.json();
        const discountPercent = resData.discountPercent;
        console.log("discountPercent", discountPercent);

        const updateCartItems = cartItems.map((item) => {
          const updatePrice = item.price * (1 - discountPercent / 100);
          return { ...item, price: updatePrice };
        });
        setCartItems(updateCartItems);
        console.log("resData", resData);
        message.success("Kuponunuzun indirim oranı uygulandı !");
      } else {
        message.error("Geçersiz kupon");
      }
    } catch (error) {
      console.error("Error fetching coupon", error);
    }
  };

  return (
    <div className="actions-wrapper">
      <div className="coupon">
        <input
          type="text"
          className="input-text"
          placeholder="Coupon code"
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <button className="btn" type="button" onClick={applyCoupon}>
          Apply Coupon
        </button>
      </div>
      <div className="update-cart">
        <button className="btn">Update Cart</button>
      </div>
    </div>
  );
};

export default CartCoupon;
