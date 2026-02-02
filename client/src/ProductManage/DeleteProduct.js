import axios from "axios";
import { IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const DeleteProduct = ({ item, GetProducts }) => {
  const DeleteFunc = async () => {
    try {
      await axios.delete("http://localhost:7001/api/product", { data: { id: item._id } });
      alert("Product deleted successfully!!!");
      GetProducts();
    } catch {
      alert("Failed to delete...");
    }
  };

  return (
    <IconButton onClick={DeleteFunc} sx={{ color: "#E88BB0" }}>
      <DeleteForeverIcon />
    </IconButton>
  );
};

export default DeleteProduct;
