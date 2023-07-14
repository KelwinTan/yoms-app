import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function PaypalPayment() {
  const createOrder = (data: any) => {
    // Order is created on the server and the order id is returned
    return fetch("/my-server/create-paypal-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // use the "body" param to optionally pass additional order information
      // like product skus and quantities
      body: JSON.stringify({
        cart: [
          {
            sku: "YOUR_PRODUCT_STOCK_KEEPING_UNIT",
            quantity: "YOUR_PRODUCT_QUANTITY",
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id);
  };

  const onApprove = (data: any) => {
    // Order is captured on the server
    return fetch("/my-server/capture-paypal-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    }).then((response) => response.json());
  };
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "ARqFYpbipKfg14tsD4KC5D-TqdWKuFqhiQBxkBcWPZF4f2b4rdmFCGshDQNlBweTxquG0uXXHZuRGq2r",
      }}
    >
      <PayPalButtons></PayPalButtons>
    </PayPalScriptProvider>
  );
}
