import React from "react";
import { db, auth } from "../Firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
const PlaceOrder = ({ cartItems }) => {
  const placeOrder = async () => {
    const user = auth.currentUser;
    if (!user) return alert(" ❌ You must be logged in to place an order.");
    const total = cartItems.reduce((sum, item) => sum + item.price.amount, 0);
    await addDoc(collection(db, "orders"), {
      userId: user.uid,
      products: cartItems,
      totalPrice: total,
      status: "pending",
      createdAt: new Date(),
    });
    alert("✅ Order placed successfully!");
  };
  return <button onClick={placeOrder}>Place Order</button>;
};
export default PlaceOrder;
