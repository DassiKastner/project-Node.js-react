const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    price:{
        type:Number,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    picture:{
        type:String,
        required:true
    },
    company:{
        type:String
    },
    //type:String,
    // user:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     required:true,
    //     ref: "User"
    // },
},{
    timestamps:true
    })
module.exports = mongoose.model('Product', productSchema)