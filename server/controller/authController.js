const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Cart = require("../models/Cart")

const login = async (req,res)=>{
    const {userName,password} = req.body
    if(!userName || !password){
        return res.status(400).json({message: "both fields are required"})
    }
    const foundedUser = await User.findOne({userName:userName}).lean()
    if(!foundedUser || foundedUser.active == false){
        return res.status(401).json({message: "Unauthorized"})
    }
    const match = await bcrypt.compare(password,foundedUser.password)
    if(!match){
        return res.status(401).json({message: "Unauthorized"})
    }
    const userInfo = {
        _id: foundedUser._id,
        name: foundedUser.name,
        userName: foundedUser.userName,        
        roles: foundedUser.roles,
        email: foundedUser.email
    }

    const accessToken = jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)

    res.json(accessToken)
    
}

const register=async(req,res)=>{
    const {userName,password,name,email,phone}=req.body
       //validation
       if(!userName||!password||!name||!email)
       {
           return res.status(400).json({message: "userName and password and name and email arr required"})
       }
       const duplicateUser=await User.findOne({userName:userName}).lean()
       if(duplicateUser)
       {
           return res.status(409).json({message:"Duplicate user"})
       }
       const hashPassword=await bcrypt.hash(password,10)
       const user=await User.create({userName,password:hashPassword,name,email,phone})
    //    let products=[];
    //    const cart = await Cart.create({user:user._id,products})
        if(!user)
        {
           return res.status(400).json({message: "bad request  hgfdfgh"})
       }
       res.json({_id:user.id,name:user.name,userName:user.userName,})
   }
module.exports = {login,register}