import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const handlePayment = async (req, res) => {
  const { products, user, cargoFee } = req.body;

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.name,
      },
      unit_amount: Math.round(product.price * 100),
    },
    quantity: product.quantity,
  }));
  if (cargoFee !== 0) {
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Fast Kargo !",
        },
        unit_amount: Math.round(cargoFee * 100),
      },
      quantity: 1,
    });
  }
  try {
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_DOMAIN}/success`,
    });
    console.log("Created session:", session);
    res.status(200).json({
      id: session.id,
    });
  } catch (error) {
    console.log("createCategory-->", error);
    res.status(500).json({ message: error });
  }
};

export { handlePayment };
