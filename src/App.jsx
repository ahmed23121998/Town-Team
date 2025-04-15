import React, { useState } from "react";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/Productlist";
import Register from "./components/Register";
import Login from "./components/Login";
import UserInfo from "./components/UserInfo";
import PlaceOrder from "./components/PlaceOrder";
import { Box, Typography, Divider, Button } from "@mui/material";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const categories = [
    { name: "kids", label: "👦 Kids Products" },
    { name: "men", label: "👨 Men Products" },
    { name: "newarrival", label: "🆕 New Arrival Products" },
    { name: "summer", label: "☀️ Summer Products" },
    { name: "winter", label: "❄️ Winter Products" },
    { name: "shoes", label: "👟 Shoes Products" },
    { name: "accessories", label: "🧢 Accessories Products" },
    { name: "trousers", label: "👖 Trousers Products" },
  ];

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <>
      {/* 🧾 Auth Section */}
      <Box sx={{ padding: "20px", backgroundColor: "#e0f7fa" }}>
        <Typography variant="h5" sx={{ my: 2}}>🔑 Register</Typography>
        <Register />
        <Typography variant="h5" sx={{ my: 2 }}>🔐 Login</Typography>
        <Login />
      </Box>
      {/* 🛒 Products Section */}
      <Box sx={{ padding: "20px" }}>
        {categories.map((cat) => (
          <React.Fragment key={cat.name}>
            <Typography variant="h4" sx={{ marginBottom: "20px" }}>
              {cat.label}
            </Typography>
            <ProductList category={cat.name} onAddToCart={handleAddToCart} />
            <Divider sx={{ margin: "40px 0" }} />
          </React.Fragment>
        ))}
      </Box>

      {/* 🧑‍💼 Admin: Add Product */}
      <Box sx={{ padding: "20px", backgroundColor: "#f5f5f5" }}>
        <Typography variant="h5" sx={{ marginBottom: "10px" }}>
          🛠️ Admin Panel: Add Product
        </Typography>
        <AddProduct />
      </Box>

      {/* 🛒 Cart Section */}
      <Box sx={{ padding: "20px", backgroundColor: "#fff3e0" }}>
        <Typography variant="h5" sx={{ marginBottom: "10px" }}>
          🧾 Cart & Order
        </Typography>
        {cartItems.length > 0 ? (
          <>
            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>
                  {item.product?.title} - {item.price?.amount} EGP
                </li>
              ))}
            </ul>
            <Box sx={{ mt: 2 }}>
              <PlaceOrder cartItems={cartItems} />
              <Button variant="outlined" color="error" sx={{ ml: 2 }} onClick={handleClearCart}>
                🗑️ Clear Cart
              </Button>
            </Box>
          </>
        ) : (
          <Typography>🛒 Your cart is empty. Please add products to your cart.</Typography>
        )}
      </Box>
    </>
  );
}

export default App;
