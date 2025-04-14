import React, { useEffect, useState } from "react";
import { db } from "../Firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Grid, Card, CardContent, Typography, CardMedia, Box, Button} from "@mui/material";

const ProductList = ({ category, onAddToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const colRef = collection(db, category);
        const snapshot = await getDocs(colRef);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(data);
      } catch (error) {
        console.error("❌ Firebase fetch error:", error.message);
      }
    };

    fetchData();
  }, [category]);

  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={3} columns={{ xs: 4, sm: 8, md: 12 }}>
        {products.map((product) => (
          <Grid item xs={4} sm={4} md={4} key={product.id}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <CardMedia
                component="img"
                image={product.image?.src}
                alt={product.product?.title}
                sx={{
                  width: "100%",
                  height: 350,
                  objectFit: "cover",
                }}
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6" gutterBottom>
                  {product.product?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.product?.type}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", marginTop: "10px" }}
                >
                  {product.price?.amount} {product.price?.currencyCode}
                </Typography>

                <Button
                  variant="contained"
                  sx={{ marginTop: 2 }}
                  onClick={() => onAddToCart && onAddToCart(product)}
                >
                  🛒 Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
