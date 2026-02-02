const express = require("express")
const verifyJWT = require("../middlewares/verifyJWT")
const router = express.Router()
const Producte = require("../models/Producte");
const productController = require("../controller/productController")

// router.use(verifyJWT)
router.post("/",verifyJWT, productController.addProducte)
router.get("/", productController.getAllProductes)
router.get("/:id", productController.getProducteById)
router.put("/:id",verifyJWT, productController.updateProducte)
router.delete("/", productController.deleteProducte) 

module.exports = router