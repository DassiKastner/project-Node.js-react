const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        index: true      
    },
    password:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    roles: {
        type: String,
        enum: ["user","admin"],
        default: "user"
    },
    active:{
        type:Boolean,
        default:true
    }
})
module.exports = mongoose.model('User',userSchema)