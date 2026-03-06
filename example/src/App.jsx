import "./App.css";
// import { checkout } from "@squadco/modal-js";
import { checkout } from "../../src/index.js";

const handleClick = async () => {
  try {
    const result = await checkout({
      key: "sandbox_pk_ef8eda0a5f1d136164a80e491f6ab7f02ee586378bbd",
      email: "test@example.com",
      amount: 5000 * 100, // Amount in kobo (for NGN)
      currency_code: "NGN",
      customer_name: "John Doe",
      onLoad: () => console.log("Modal loaded"),
      onSuccess: (data) => console.log("Payment success", data),
      onClose: () => console.log("Modal closed"),
    });

    console.log("Checkout result:", result);
  } catch (err) {
    console.log("Payment closed or failed:", err);
  }
};

function App() {
  return (
    <>
      <button onClick={handleClick}> Squadco Checkout </button>
    </>
  );
}

export default App;
