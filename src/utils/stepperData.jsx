const divClass = "text-2xl font-bold text-gray-600 mb-6";
export const CHECKOUT_STEPS = [
  {
    name: "Customer Info",
    Component: () => (
      <div className={divClass}>Provide your contact details.</div>
    ),
  },
  {
    name: "Shipping Info",
    Component: () => (
      <div className={divClass}>Enter your shipping address.</div>
    ),
  },
  {
    name: "Payment",
    Component: () => (
      <div className={divClass}>Complete payment for your order.</div>
    ),
  },
  {
    name: "Delivered",
    Component: () => (
      <div className={`${divClass} text-green-800`}>
        {" "}
        Your order has been delivered.
      </div>
    ),
  },
];
