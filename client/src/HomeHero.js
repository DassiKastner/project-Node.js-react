import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useRef } from "react";

const HomeHeroVideo  = ({ scrollToProduct }) => {
const productsRef = useRef(null);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "70vh", md: "85vh" },
        overflow: "hidden",
        mb: 6,
      }}
    >
      {/* וידאו */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* שכבת כהות */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.25))",
          zIndex: 1,
        }}
      />

      {/* תוכן */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "#fff",
          px: 2,
        }}
      >
        <motion.div
        
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography
            sx={{
              fontSize: { xs: "2rem", md: "3.2rem" },
              fontWeight: "bold",
              mb: 2,
            }}
          >
            חוויית קנייה שילדים אוהבים
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Typography
            sx={{
              fontSize: { xs: "1.1rem", md: "1.4rem" },
              opacity: 0.9,
              mb: 4,
            }}
          >
            עיצוב • איכות • שמחה קטנה בכל מוצר
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >

          <Box
            sx={{
              position: "relative",
              display: "inline-flex",
              mt: 4,
            }}
          >
            {/* שכבת אנימציה */}
            <Box
              sx={{
                position: "absolute",
                inset: -12,
                borderRadius: "999px",
                backgroundColor: "rgba(201, 125, 151, 0.35)",
                animation: "pulse 2s infinite",
                zIndex: 0,
              }}
            />

            <Button
              onClick={scrollToProduct}
              sx={{
                position: "relative",
                zIndex: 1,
                px: 5,
                py: 1.5,
                borderRadius: "999px",
                backgroundColor: "#F4A7C1",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "1.1rem",
                textTransform: "none",
                boxShadow: "0 10px 25px rgba(244,167,193,0.5)",
                "&:hover": {
                  backgroundColor: "#E88BB0",
                },
              }}
            >
              צפייה במוצרים ↓
            </Button>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default HomeHeroVideo;
