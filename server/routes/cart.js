const express = require("express")
const verifyJWT = require("../middlewares/verifyJWT")
const router = express.Router()
const cart = require("../models/Cart");
const cartController = require("../controller/cartController");

router.use(verifyJWT)
router.post("/", cartController.addCart)
router.get("/", cartController.getAllCart)
router.get("/:id", cartController.getCartById)
router.put("/", cartController.updateCart)
router.delete("/:id", cartController.deleteCart)
router.delete("/", cartController.deleteAllCart)
module.exports = router