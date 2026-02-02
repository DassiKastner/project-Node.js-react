import axios from "axios";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  Stack,
  Paper,
  Button,
  Snackbar,
  Alert
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";

const GetCart = () => {
  const [carts, setCarts] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const Show = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        "http://localhost:7001/api/cart",
        { headers: { authorization: `Bearer ${token}` } }
      );
      setCarts(data);
    } catch {
      console.log("Failed to show the cart...");
    }
  };

  const deleteFunc = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:7001/api/cart/${id}`,
        { headers: { authorization: `Bearer ${token}` } }
      );
      Show();
    } catch {
      alert("Failed to delete from the cart...");
    }
  };

  useEffect(() => {
    Show();
  }, []);

  const totalPrice = carts.reduce(
    (sum, item) => sum + (item.product?.price || 0),
    0
  );

  const Payment = async () => {
 debugger   
    try{
      const token = localStorage.getItem("token");
      await axios.delete(
        "http://localhost:7001/api/cart/",
        { headers: { authorization: `Bearer ${token}` } }
      );
      setSnackbarOpen(true);
    }
    catch{
      alert("Failed to delete the cart...");
    }
    
  }

  return (
    <Box
      dir="rtl"
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #FFF7FB 0%, #F1F8FF 100%)",
        p: 4,
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#F4A7C1",
          mb: 4,
        }}
      >
        סל הקניות שלך
      </Typography>

      <Paper
        sx={{
          maxWidth: 900,
          mx: "auto",
          p: 3,
          borderRadius: 4,
          boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
        }}
      >
        {/* כותרות */}
        <Stack
          direction="row"
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#F4A7C1",
            fontFamily: "",
            mb: 2,
          }}
        >
          <Box width="20%">מוצר</Box>
          <Box width="40%">שם</Box>
          <Box width="20%">מחיר</Box>
          <Box width="20%" textAlign="center">
            הסרה
          </Box>
        </Stack>

        <Divider />

        {carts.length > 0 ? (
        carts.map((item) => {
            if (!item.product) return null; 
            return (
            <Box key={item._id}>
                <Stack direction="row" alignItems="center" fontFamily="" sx={{ py: 2 }}>
                <Box width="20%">
                    <img
                    src={`/images/${item.product?.picture}`}
                    alt={item.product?.title}
                    style={{
                        width: 70,
                        height: 70,
                        objectFit: "contain",
                        borderRadius: 8,
                    }}
                    />
                </Box>

                <Box width="40%">
                    <Typography>{item.product?.title || "מוצר לא קיים"}</Typography>
                </Box>

                <Box width="20%">
                    <Typography fontWeight="bold">
                    ₪{item.product?.price ?? 0}
                    </Typography>
                </Box>

                <Box width="20%" textAlign="center">
                    <IconButton onClick={() => deleteFunc(item._id)} sx={{ color: "#E88BB0" }}>
                    <DeleteForeverIcon />
                    </IconButton>
                </Box>
                </Stack>

                <Divider />
            </Box>
            );
        })
        ) : (
        <Typography sx={{ textAlign: "center", py: 5 }}>
           הסל שלך ריק, זה הזמן להתחיל למלא......😄
        </Typography>
        )}


        {/* סיכום */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 4 }}
        >
          <Typography
            fontSize="1.3rem"
            fontWeight="bold"
            color="#F4A7C1"
          >
            סה״כ לתשלום: ₪{totalPrice}
          </Typography>

          <Button
            onClick={() => {Payment()}}
            sx={{
              px: 4,
              py: 1.3,
              backgroundColor: "#F4A7C1",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "30px",
              textTransform: "none",
              fontSize: "1.1rem",
              boxShadow: "0 8px 20px rgba(244,167,193,0.4)",
              "&:hover": {
                backgroundColor: "#E88BB0",
                boxShadow: "0 10px 25px rgba(232,139,176,0.5)",
              },
            }}
          >
            תשלום
          </Button>
        </Stack>
      </Paper>
      <Snackbar
              open={snackbarOpen}
              autoHideDuration={2000}
              onClose={() => {setSnackbarOpen(false); navigate("/")}}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
              <Alert severity="success" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                  תשלום בוצע בהצלחה!
              </Alert>
      </Snackbar>
    </Box>
    
  );
};

export default GetCart;
