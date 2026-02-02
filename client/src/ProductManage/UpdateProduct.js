import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Card, CardContent, Typography, Stack, TextField, Button } from "@mui/material";

const UpdateProduct = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [price, setPrice] = useState("");
  const [picture, setPicture] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`http://localhost:7001/api/product/${id}`);
      setTitle(data.title);
      setCode(data.code);
      setPrice(data.price);
      setPicture(data.picture);
      setCompany(data.company);
      setDescription(data.description);
    };
    fetchProduct();
  }, [id]);

  const UpdateFunction = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:7001/api/product/${id}`,
        { title, description, price, code, picture, company },
        { headers: { authorization: `Bearer ${token}` } }
      );
      alert("Product updated successfully!!!");
      navigate("/AllProducts");
    } catch {
      alert("failed to update product...");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #FFF7FB 0%, #F1F8FF 100%)",
        p: 4,
      }}
    >
      <Card sx={{ width: 450, borderRadius: 4, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}>
        <CardContent>
          <Typography
            sx={{ fontSize: "1.6rem", fontWeight: "bold", color: "#F4A7C1", mb: 3, textAlign: "center" }}
          >
            עדכון מוצר
          </Typography>

          <Stack spacing={2.5}>
            <TextField 
              label="שם מוצר" 
              fullWidth 
              value={title} 
              inputProps={{
                dir: "rtl",
                style: { textAlign: "right" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "16px",
                  backgroundColor: "#FFF",
                },
              }}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField 
              label="תאור" 
              fullWidth 
              value={description} 
              inputProps={{
                dir: "rtl",
                style: { textAlign: "right" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "16px",
                  backgroundColor: "#FFF",
                },
              }}
              onChange={(e) => setDescription(e.target.value)} 
            />
            <TextField
              label="מחיר"
              fullWidth
              value={price} 
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "16px",
                  backgroundColor: "#FFF",
                },
              }}
              onChange={(e) => setPrice(e.target.value)} 
            />
            <TextField 
              label="קוד מוצר" 
              fullWidth 
              type="password" 
              value={code} 
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "16px",
                  backgroundColor: "#FFF",
                },
              }}
              onChange={(e) => setCode(e.target.value)} />
            <TextField 
              label="נתיב תמונה" 
              fullWidth 
              value={picture} 
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "16px",
                  backgroundColor: "#FFF",
                },
              }}
              onChange={(e) => setPicture(e.target.value)} />
            <TextField 
              label="חברה" 
              fullWidth 
              value={company} 
              inputProps={{
                dir: "rtl",
                style: { textAlign: "right" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "16px",
                  backgroundColor: "#FFF",
                },
              }}
              onChange={(e) => setCompany(e.target.value)} 
            />

            <Button
              type="submit"
              fullWidth
              sx={{
                mt: 2,
                py: 1.3,
                backgroundColor: "#F4A7C1",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "30px",
                textTransform: "none",
                fontSize: "1.1rem",
                "&:hover": { backgroundColor: "#E88BB0" },
              }}
              onClick={UpdateFunction}
            >
              עדכון מוצר
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UpdateProduct;
