import { Box, Typography, Grid, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { keyframes } from "@mui/system";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from "react";
import { CacheProvider } from "@emotion/react";
import { ltrCache } from "./theme";

const colorShift = keyframes`
  0% { border-image: linear-gradient(45deg, #F4A7C1, #9cccec) 1; }
  50% { border-image: linear-gradient(45deg, #9cccec, #F4A7C1) 1; }
  100% { border-image: linear-gradient(45deg, #F4A7C1, #9cccec) 1; }
`;

const allTestimonials = [
  { name: "אורן כהן", comment: "“שירות מדהים! המוצרים הגיעו מהר והילדים שלי ממש אוהבים אותם.“" },
  { name: "דנה לוי", comment: "“אתר מדליק וממש נעים לגלישה. חוויית קנייה מושלמת.“" },
  { name: "תום ברק", comment: "“אהבתי במיוחד את איכות המוצרים והאריזה החמודה.“" },
  { name: "מאיה לוי", comment: "“ממש כיף לקנות כאן! הכל מסודר, ברור וקל. חווית קניה מושלמת!!“" },
  { name: "רועי כץ", comment: "“מוצרים איכותיים ושירות יוצא דופן. אהבתי את האריזה, ממליץ בחום!“" },
  { name: "נועה רוזן", comment: "“כל ילד שמח לקבל את המוצרים האלה, ממש חוויית קנייה קסומה.“" },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const visibleCount = 3; // כמה ציטוטים לראות בבת אחת

  const handlePrev = () => setIndex((prev) => (prev - 1 + allTestimonials.length) % allTestimonials.length);
  const handleNext = () => setIndex((prev) => (prev + 1) % allTestimonials.length);

  const visibleTestimonials = [];
  for (let i = 0; i < visibleCount; i++) {
    visibleTestimonials.push(allTestimonials[(index + i) % allTestimonials.length]);
  }

  return (
    <CacheProvider value={ltrCache}>
    <Box sx={{ py: 10, display: "flex", justifyContent: "center", position: "relative" }}>
      
      {/* חצים */}
      <IconButton
        onClick={handlePrev}
        sx={{ position: "absolute", left: 200, top: "50%", transform: "translateY(-50%)", zIndex: 5, color: "rgba(77, 69, 69, 0.7)" }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>

      <IconButton
        onClick={handleNext}
        sx={{ position: "absolute", right: 200, top: "50%", transform: "translateY(-50%)", zIndex: 5, color: "rgba(77, 69, 69, 0.7)" }}
      >
        <ArrowForwardIosIcon />
      </IconButton>

      <Grid container spacing={4} justifyContent="center" sx={{ maxWidth: 900 }}>
        {visibleTestimonials.map((t, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}              
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
            >
              <Box
                sx={{
                  p: 4,
                  borderRadius: 3,
                  border: "3px solid",
                  borderImageSlice: 1,
                  borderImageSource: "linear-gradient(45deg, #F4A7C1, #9cccec)",
                  animation: `${colorShift} 3s linear infinite`,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  overflow: "hidden",
                  textAlign: "right",
                  direction: "rtl",
                  background: "transparent",
                }}
              >
                {/* מרכאות בתחילת הציטוט */}
                {/* <Typography
                  sx={{
                    fontSize: "2.5rem",
                    color: "#F4A7C1",
                    fontWeight: "bold",
                    opacity: 0.4,
                    position: "absolute",
                    top: 18,
                    right: 40,
                  }}
                >
                  “
                </Typography> */}

                <Typography sx={{ fontSize: "1rem", color: "#555", pr: 4 }}>
                  {t.comment}
                </Typography>
                
                <Typography sx={{ fontWeight: "bold", color: "#9cccec", mt: 2 }}>
                  — {t.name}
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
    </CacheProvider>
  );
};

export default Testimonials;
