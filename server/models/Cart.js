const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Product"
    }
}, { timestamps: true })
module.exports = mongoose.model("Basket", CartSchema)



