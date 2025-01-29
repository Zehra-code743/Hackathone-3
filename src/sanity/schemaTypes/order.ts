import { defineType } from "sanity";

export const orderSchema = defineType({
  name: "orders",
  title: "Orders",
  type: "document",
  fields: [
    { name: "orderId", title: "Order ID", type: "number" },
    { name: "customer", title: "Customer", type: "reference", to: [{ type: "customers" }] },
    { name: "products", title: "Products", type: "array", of: [{ type: "reference", to: [{ type: "products" }] }] },
    { name: "totalAmount", title: "Total Amount", type: "number" },
  ],
});


export default orderSchema