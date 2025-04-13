import React from "react";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/Productlist";
import { Box, Typography, Divider } from "@mui/material";
function App() {
  return (
    <>
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>👦 Kids Products</Typography>
        <ProductList category="kids" />
        <Divider sx={{ margin: "40px 0" }} />
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>👨 Men Products</Typography>
        <ProductList category="men" />
        <Divider sx={{ margin: "40px 0" }} />
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>👨 Newarrival Products</Typography>
        <ProductList category="newarrival" />
        <Divider sx={{ margin: "40px 0" }} />
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>👨 Summer Products</Typography>
        <ProductList category="summer" />
        <Divider sx={{ margin: "40px 0" }} />
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>👨 Winter Products</Typography>
        <ProductList category="winter" />
        <Divider sx={{ margin: "40px 0" }} />
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>👨 Shoes Products</Typography>
        <ProductList category="shoes" />
        <Divider sx={{ margin: "40px 0" }} />
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>👨 Accessories Products</Typography>
        <ProductList category="accessories" />
      </Box>
      <Box sx={{ marginTop: "40px" }}>
        <AddProduct />
      </Box>
    </>
  );
}

export default App;
