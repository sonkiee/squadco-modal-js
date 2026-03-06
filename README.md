# @squadco/modal-js

A lightweight TypeScript wrapper for Squadco payment modal with React 13 support, including hooks and event emitter.

---

## Installation

```bash
npm install @squadco/modal-js

```

## Usage (Direct Checkout)

```ts

import { checkout } from "@squadco/modal-js";

const handlePayment = async () => {
  try {
    const result = await checkout({
      key: "test_pk_sample-public-key-1",
      email: "<test@example.com>",
      amount: 5000, // In Kobo or Cents
      currency_code: "NGN",
      customer_name: "John Doe",
      onLoad: () => console.log("Modal loaded"),
      onSuccess: (data) => console.log("Payment success", data),
      onClose: () => console.log("Modal closed"),
    });

    console.log("Checkout result:", result);
  } catch (err) {
    console.error("Payment closed or failed:", err);
  }
};

handlePayment();

```

## Usage (React Hook)

```tsx

import React from "react";
import { useSquadCheckout } from "@squadco/modal-js";

export default function App() {
  const { pay } = useSquadCheckout();

  const handlePayment = async () => {
    try {
      const result = await pay({
        key: "test_pk_sample-public-key-1",
        email: "<test@example.com>",
        amount: 5000,
        currency_code: "NGN",
        customer_name: "John Doe",
        onLoad: () => console.log("Modal loaded"),
        onSuccess: (data) => console.log("Payment success", data),
        onClose: () => console.log("Modal closed"),
      });

      console.log("Hook checkout result:", result);
    } catch (err) {
      console.error("Payment closed or failed:", err);
    }
  };

  return <button onClick={handlePayment}>Pay Now</button>;
}

```

## Example App

You can run a full React example included in the repo:

```bash

git clone <https://github.com/sonkiee/squadco-modal-js>
cd squadco-modal-js/example
npm install
npm start

```

The example demonstrates both the direct checkout call and useSquadCheckout hook.

## Features

- TypeScript support
- Direct checkout function
- React 13 hook (useSquadCheckout)
- Event emitter for payment.success and payment.closed
- Robust dynamic script loader

## License

MIT
