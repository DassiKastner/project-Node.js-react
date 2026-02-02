require("dotenv").config()
const express = require("express")
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/dbConn")
const PORT = process.env.PORT || 7001
const app = express()
const mongoose =require ('mongoose')
connectDB()
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
mongoose.connection.on('error', err => {
    console.log(err)
})
//middlewares
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))
app.use("/api/product", require("./routes/product"))
app.use("/api/cart", require("./routes/cart"))
app.use("/api/user", require("./routes/user"))
app.use("/api/auth", require("./routes/auth"))
//routes
app.get("/",(req,res)=>{
res.send("this is the home page")
})

