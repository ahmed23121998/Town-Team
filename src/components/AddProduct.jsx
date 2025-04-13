import React, { useState } from "react";
import { db } from "../Firebase/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { TextField, Select, MenuItem, Button, Container, Typography, Box, InputLabel, FormControl,} from "@mui/material";

const AddProduct = () => {
  const [product, setProduct] = useState({
    id: "",
    title: "",
    type: "",
    image: "",
    price: "",
    currencyCode: "EGP",
    category: "kids",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productRef = doc(db, product.category, product.id);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        alert("⚠️ This ID already exists. Please use a different one.");
        return;
      }

      const newProduct = {
        id: product.id,
        product: {
          title: product.title,
          type: product.type,
        },
        image: {
          src: product.image,
        },
        price: {
          amount: product.price,
          currencyCode: product.currencyCode,
        },
      };

      await setDoc(productRef, newProduct);

      alert("✅ Product added successfully!");
      setProduct({
        id: "",
        title: "",
        type: "",
        image: "",
        price: "",
        currencyCode: "EGP",
        category: "kids",
      });
    } catch (error) {
      console.error("❌ Error adding product:", error.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Add New Product
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Product ID"
          name="id"
          value={product.id}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Title"
          name="title"
          value={product.title}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Type"
          name="type"
          value={product.type}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Image URL (without https:)"
          name="image"
          value={product.image}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          required
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel>Currency</InputLabel>
          <Select
            name="currencyCode"
            value={product.currencyCode}
            onChange={handleChange}
            label="Currency"
          >
            <MenuItem value="EGP">EGP</MenuItem>
            <MenuItem value="USD">USD</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={product.category}
            onChange={handleChange}
            label="Category"
          >
            <MenuItem value="kids">Kids</MenuItem>
            <MenuItem value="men">Men</MenuItem>
            <MenuItem value="winter">Winter</MenuItem>
            <MenuItem value="summer">Summer</MenuItem>
            <MenuItem value="newarrival">New Arrival</MenuItem>
            <MenuItem value="shoes">Shoes</MenuItem>
            <MenuItem value="accessories">Accessories</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" type="submit">
          Add Product
        </Button>
      </Box>
    </Container>
  );
};

export default AddProduct;
