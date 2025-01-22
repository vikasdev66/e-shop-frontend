import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutFormPage from "./CheckoutForm.jsx";
import { useSelector } from "react-redux";
import { selectOrdersDetails } from "../features/order/orderSlice";
import "../Stripe.css";
const stripePromise = loadStripe(
  "pk_test_51QiiXICMnex816qE7iDmEx03LepIX8CMboJJIpv0fQq1bz2osgiVR1VnYdmE0mtUWvLjeRdgK6HwOhVNus7yuBuM00AbhVzpA4"
);

const StripeCheckout = () => {
  const order = useSelector(selectOrdersDetails);
  console.log("StripeCheckout:", order);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalAmount: order?.currentOrder?.subTotal }),
      meta: {
        order_id: order?.currentOrder?.id,
      },
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={{ clientSecret, appearance }} stripe={stripePromise}>
          <CheckoutFormPage />
        </Elements>
      )}
    </div>
  );
};

export default StripeCheckout;
