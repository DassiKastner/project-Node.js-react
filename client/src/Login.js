import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ userName: "", password: "" });
  const navigate = useNavigate();

  const submitLogin = async (e) => {
    e.preventDefault();

    // ולידציה בצד לקוח
    const newErrors = {};
    if (!userName) newErrors.userName = "חובה להזין שם משתמש";
    if (!password) newErrors.password = "חובה להזין סיסמה";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:7001/api/auth/login",
        { userName, password }
      );
      localStorage.setItem("token", data);
      navigate("/");
    } catch (err) {
      const status = err.response?.status;

      if (status === 400) {
        setErrors({
          userName: "שני השדות חובה",
          password: "שני השדות חובה",
        });
      }

      if (status === 401) {
        setErrors({
          userName: "שם משתמש או סיסמה שגויים",
          password: "שם משתמש או סיסמה שגויים",
        });
      }
    }
  };

  return (
    <Box  
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #FFF7FB 0%, #F1F8FF 100%)",
      }}
    >
      <Card
        sx={{
          width: 380,
          borderRadius: 4,
          boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            align="center"
            sx={{
              fontSize: "1.6rem",
              fontWeight: "bold",
              color: "#9cccec",
              mb: 3,
            }}
          >
            ברוכים הבאים 💕
          </Typography>

          <Box component="form" onSubmit={submitLogin}>
            <Stack spacing={2.5}>
              <TextField
                label="* שם משתמש"
                fullWidth
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                  setErrors((prev) => ({ ...prev, userName: "" }));
                }}
                error={Boolean(errors.userName)}
                helperText={errors.userName}
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
                label="* סיסמא"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, password: "" }));
                }}
                error={Boolean(errors.password)}
                helperText={errors.password}
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
                  boxShadow: "0 8px 20px rgba(244,167,193,0.4)",
                  "&:hover": {
                    backgroundColor: "#E88BB0",
                    boxShadow: "0 10px 25px rgba(232,139,176,0.5)",
                  },
                }}
              >
                כניסה
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
