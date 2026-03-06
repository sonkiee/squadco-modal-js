import React from "react";
// Direct import from src for testing example
import { checkout, useSquadCheckout } from "../../src/index";

export default function App() {
  const { pay } = useSquadCheckout();

  // Direct checkout button
  const handleDirectCheckout = async () => {
    try {
      const result = await checkout({
        key: "sandbox_pk_ef8eda0a5f1d136164a80e491f6ab7f02ee586378bbd",
        email: "test@example.com",
        amount: 5000 * 100, // Amount in kobo
        currency_code: "NGN",
        customer_name: "John Doe",
        onLoad: () => console.log("Direct modal loaded"),
        onSuccess: (data) => console.log("Direct payment success", data),
        onClose: () => console.log("Direct modal closed"),
      });

      console.log("Direct checkout result:", result);
    } catch (err) {
      console.log("Direct payment closed or failed:", err);
    }
  };

  // Hook checkout button
  const handleHookCheckout = async () => {
    try {
      const result = await pay({
        key: "sandbox_pk_ef8eda0a5f1d136164a80e491f6ab7f02ee586378bbd",
        email: "hook@example.com",
        amount: 5000 * 100,
        currency_code: "NGN",
        customer_name: "Jane Doe",
        onLoad: () => console.log("Hook modal loaded"),
        onSuccess: (data) => console.log("Hook payment success", data),
        onClose: () => console.log("Hook modal closed"),
      });

      console.log("Hook checkout result:", result);
    } catch (err) {
      console.log("Hook payment closed or failed:", err);
    }
  };

  return (
    <div style={{ display: "flex", gap: "1rem", padding: "2rem" }}>
      <button onClick={handleDirectCheckout}>Direct Checkout</button>
      <button onClick={handleHookCheckout}>Hook Checkout</button>
    </div>
  );
}
