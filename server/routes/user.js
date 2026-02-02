const express = require("express")
const router = express.Router()
const User = require("../models/User")
const userController = require("../controller/userController")

router.post("/", userController.addUser)
router.get("/", userController.getAllUser)
router.get("/:id", userController.getUserById)
router.put("/", userController.updateUser)
router.delete("/:id", userController.deleteUsers)

module.exports = router