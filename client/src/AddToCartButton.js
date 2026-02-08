import { useState } from "react";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import StarsBurst from "./StarsBurst";

const AddToCartButton = ({ onAdd }) => {
  const [showStars, setShowStars] = useState(false);

  const handleClick = async () => {
    await onAdd();
    setShowStars(true);
    setTimeout(() => setShowStars(false), 2000);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
      }}
    >
      <Button
        fullWidth
        onClick={handleClick}
        sx={{
          backgroundColor: "#F4A7C1",
          color: "#fff",
          borderRadius: "30px",
          fontWeight: "bold",
          py: 1,
          textTransform: "none",
          transition: "0.3s",
          "&:hover": {
            backgroundColor: "#E88BB0",
            boxShadow: "0 4px 15px rgba(232,139,176,0.5)",
          },
        }}
      >
        <AddIcon /> הוסף לסל
      </Button>

      <StarsBurst show={showStars} />
    </Box>
  );
};

export default AddToCartButton;
