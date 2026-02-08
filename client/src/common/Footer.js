import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { ArrowUpward } from '@mui/icons-material';
import { motion } from "framer-motion";
import { useState } from "react";

const Footer = () => {

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSnackbarOpen(true);
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box
      dir="rtl"
      sx={{
        background: "#FADADD",
        px: { xs: 2, md: 6 },
        py: 3,
        mt: 6,
      }}
    >
      <form onSubmit={handleSubmit}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems="center"
        >
          <TextField
            placeholder="שם"
            size="small"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            sx={{
                backgroundColor: "#fff",
                borderRadius: "20px",
                minWidth: 160,
                "& fieldset": { border: "none" },
            }}
           />
           <TextField
            placeholder="אימייל"
            type="email"
            size="small"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            sx={{
                backgroundColor: "#fff",
                borderRadius: "20px",
                minWidth: 220,   
                "& fieldset": { border: "none" },
            }}
            />
            <TextField
            placeholder="תוכן הפניה"
            size="small"
            required
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            sx={{
                backgroundColor: "#fff",
                borderRadius: "20px",
                minWidth: 300,
                "& fieldset": { border: "none" },
            }}
            />
          <Button
            type="submit"
            sx={{
              backgroundColor: "#F4A7C1",
              color: "#fff",
              px: 3,
              borderRadius: "20px",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#E88BB0",
              },
            }}
          >
            שליחה
          </Button>
        </Stack>
      </form>

    <motion.div
      whileHover={{ scale: 1.2 }}
      style={{
        position: "fixed",
        bottom: 30,
        left: 30,
        zIndex: 1000,
      }}
    >
      <Button
        onClick={scrollToTop}
        sx={{
          borderRadius: "50%",
          background: "transparent",
          color: "rgba(77, 69, 69, 0.7)",
          minWidth: "30px",
          minHeight: "30px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          "&:hover": { backgroundColor: "#abc9dd" },
        }}
      >
        <ArrowUpward />
      </Button>
    </motion.div>

      {/* שורה תחתונה – פרטי בעל האתר */}
      <Box
        sx={{
          borderTop: "1px solid rgba(0,0,0,0.1)",
          mt: 3,
          pt: 2,
          textAlign: "center",
        }}
      >
        <Typography fontSize="0.9rem" color="#555">
          © 2024 | נבנה ומנוהל ע״י <strong>דסי קסטנר</strong>
        </Typography>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => {setSnackbarOpen(false);}}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
          פנייתך נשלחה בהצלחה!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Footer;
