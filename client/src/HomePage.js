import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Slider,
  InputAdornment,
  Stack,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import HomeHeroVideo from "./HomeHero";
import { useRef } from "react";
import Testimonials from "./Testimonials"
import { motion, AnimatePresence } from "framer-motion";
import AddToCartButton from "./AddToCartButton"
import SearchIcon from '@mui/icons-material/Search';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const token = localStorage.getItem("token");
  const productsRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState([0, 500]);

  const scrollToProducts = () => {
    if (productsRef.current) {
        const headerOffset = 210;
        const elementPosition = productsRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
        });
    }
  };


  const Show = async () => {
    try {
      const { data } = await axios.get("http://localhost:7001/api/product");
      setProducts(data);
    } catch {
      alert("Failed to load products");
    }
  };

  const AddToCart = async (productId) => {
    debugger
    if (!token) return;
    try {
        await axios.post(
        "http://localhost:7001/api/cart",
        { product: productId },
        { headers: { authorization: `Bearer ${token}` } }
        );
        setSnackbarOpen(true);
    } catch {
        alert("Failed to add to cart");
    }
  };

  useEffect(() => {
    Show();
  }, []);

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = item.price >= priceFilter[0] && item.price <= priceFilter[1];
    return matchesSearch && matchesPrice;
  });


  return (
    <>
    <Box
      sx={{
        minHeight: "100vh",
        // background: "linear-gradient(135deg, #FFF7FB 0%, #F1F8FF 100%)",
        background: "#F1F8FF",
        py: 6,
        px: 3,
      }}
    >
      <HomeHeroVideo scrollToProduct={scrollToProducts} />
      <Typography
        align="center"
        sx={{
          fontSize: "2.2rem",
          fontWeight: "bold",
          color: "#9cccec",
          mb: 5,
        }}
      >
        ✨ מוצרים שילדים אוהבים ✨
      </Typography>

    <Box dir="rtl" sx={{ display: "flex", gap: 8, mb: 3, flexWrap: "wrap" }}>
      <TextField
        label="חיפוש מוצר"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        // fullWidth
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start"><SearchIcon/></InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "30px",
            backgroundColor: "#f4f3f0",
          },
        }}
      />

      <Box sx={{ width: 200, mt: -2 }}>
        <Typography
          sx={{
            fontSize: "0.9rem",
            fontWeight: "bold",
            color: "#888",
            mb: 1,
            textAlign: "center",
          }}
        >
          מחיר: ₪{priceFilter[0]} – ₪{priceFilter[1]}
        </Typography>

        <Slider
          value={priceFilter}
          onChange={(e, newValue) => setPriceFilter(newValue)}
          min={0}
          max={500}
          step={10}
          valueLabelDisplay="auto"
          sx={{
            color: "#ffe68b",
            "& .MuiSlider-thumb": {
              boxShadow: "0 0 0 6px #fbf3d4",
            },
          }}
        />
      </Box>

    {/* </Stack> */}
    </Box>

    <Box  ref={productsRef}>
      <Grid container spacing={4} justifyContent="center">
        {filteredProducts.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
                height: 420,
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.5s ease, box-shadow 0.5s ease",
                "&:hover": {
                    transform: "translateY(-6px)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                },
              }}
            >
              <CardMedia
                component="img"
                image={`/images/${item.picture}`}
                alt={item.title}
                sx={{
                  height: 180,
                  objectFit: "cover",
                  
                }}
              />

              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  textAlign: "center",
                  py: 2,
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      color: "#555",
                      mb: 1,
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "0.95rem",
                      color: "#888",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      mb: 2,
                    }}
                  >
                    {item.description}
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    fontSize: "1.3rem",
                    fontWeight: "bold",
                    color: "#f7ca27",
                    mb: 2,
                  }}
                >
                   ₪ {item.price}
                </Typography>
                
                <AddToCartButton
                    key={item._id}
                    onAdd={() => AddToCart(item._id)}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Testimonials />
    </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
        <Alert severity="success" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
            !נוסף לסל בהצלחה
        </Alert>
      </Snackbar>
    </Box>
    </>
  );
};

export default HomePage;
