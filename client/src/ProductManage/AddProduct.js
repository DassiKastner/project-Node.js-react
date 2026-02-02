import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Card, CardContent, Typography, Stack } from "@mui/material";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [price, setPrice] = useState("");
  const [picture, setPicture] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const AddFunction = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!title) newErrors.title = "חובה להזין שם מוצר";
    if (!price) newErrors.price = "חובה להזין מחיר";
    if (!code) newErrors.code = "חובה להזין קוד מוצר";
    if (!picture) newErrors.picture = "חובה להזין נתיב תמונה";
    if (!company) newErrors.company = "חובה להזין שם חברה";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:7001/api/product",
        { title, description, price, code, picture, company },
        { headers: { authorization: `Bearer ${token}` } }
      );
      alert("Product created successfully!!!");
      navigate("/AllProducts");
    } catch {
      alert("Failed to add product...");
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
            הוסף מוצר חדש
          </Typography>

          <Stack spacing={2.5}>
            <TextField
              label="שם מוצר"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={!!errors.title}
              helperText={errors.title}
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
            />
            <TextField
              label="תאור"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
            />
            <TextField
              label="מחיר"
              fullWidth
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              error={!!errors.price}
              helperText={errors.price}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "16px",
                  backgroundColor: "#FFF",
                },
              }}
            />
            <TextField
              label="קוד מוצר"
              fullWidth
              value={code}
              type="password"
              onChange={(e) => setCode(e.target.value)}
              error={!!errors.code}
              helperText={errors.code}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "16px",
                  backgroundColor: "#FFF",
                },
              }}
            />
            <TextField
              label="נתיב תמונה"
              fullWidth
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
              error={!!errors.picture}
              helperText={errors.picture}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "16px",
                  backgroundColor: "#FFF",
                },
              }}
            />
            <TextField
              label="חברה"
              fullWidth
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              error={!!errors.company}
              helperText={errors.company}
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
              onClick={AddFunction}
            >
              הוסף מוצר
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddProduct;
