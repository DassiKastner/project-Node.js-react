import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import DeleteProduct from "./DeleteProduct";
import EditIcon from "@mui/icons-material/Edit";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const GetProducts = async () => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.get("http://localhost:7001/api/product", {
        headers: { authorization: `Bearer ${token}` },
      });
      setProducts(data);
    } catch {
      alert("Failed to fetch products...");
    }
  };

  useEffect(() => {
    GetProducts();
  }, []);

  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
        justifyContent: "center",
      }}
    >
      {products.length > 0 ? (
        products.map((item) => (
          <Card
            key={item._id}
            sx={{
                width: 300,
                height: 430,
                borderRadius: 3,
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                direction: "rtl",
                display: "flex",
                flexDirection: "column",
            }}
            >
            <CardMedia
                component="img"
                height="180"
                image={`/images/${item.picture}`}
                alt={item.title}
                sx={{
                objectFit: "cover",
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                transition: "transform 0.6s ease",
                "&:hover": { transform: "scale(1.08)" }, // הגדלה רכה
                }}
            />

            <CardContent
                sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                }}
            >
            <Box dir="rtl">
                <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#F4A7C1", mb: 1 }}
                >
                    {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#666" }}>
                    {item.description}
                </Typography>
            </Box>

            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                <Button
                    variant="contained"
                    fullWidth
                    // startIcon={<EditIcon />}      
                    onClick={() => navigate(`/UpdateProduct/${item._id}`)}
                    sx={{
                    backgroundColor: "#F4A7C1",
                    color: "#fff",
                    borderRadius: "30px",
                    textTransform: "none",
                    "&:hover": { backgroundColor: "#E88BB0" },
                    }}
                >
                    עריכת המוצר
                </Button>
                <DeleteProduct item={item} GetProducts={GetProducts} />
            </Stack>
            </CardContent>
            </Card>

        ))
      ) : (
        <Typography sx={{ textAlign: "center", width: "100%" }}>אין מוצרים להצגה</Typography>
      )}
    </Box>
  );
};

export default AllProducts;
