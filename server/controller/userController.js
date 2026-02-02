const User = require("../models/User");

const addUser = async (req,res)=>{
    const {userName,password,name,email,phone,roles,active} = req.body
    const user = await User.create({userName,password,name,email,phone,roles,active});
    res.json(user)
}

const getAllUser = async (req,res)=>{
    const users = await User.find().lean()
    if (!users?.length) { 
        return res.status(400).json({ message: 'No users found' })
        }
        res.json(users)
}

const getUserById = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
        return res.send("No such user")
    }
    res.json(user)
}


const updateUser = async (req,res)=>{
    const {userName,password,name,email,phone,roles,active} = req.body
    const user = await User.findById(id)
    user.userName = userName,
    user.password = password, 
    user.name = name,
    user.email = email, 
    user.phone = phone, 
    user.roles = roles, 
    user.active = active 
    const updateUser = await user.save()
    res.json(user)
}

// const deleteUser = async (req,res)=>{
//     const {id} = req.params
//     const user = await User.deleteOne()
//     res.json("user deleted complete")
// }
const deleteUsers = async (req, res) => {
    const { id } = req.body
    const user = await User.findById(id)
    if (!user) {
        return res.send("No such user")
    }
    const result = await user.deleteOne()
    const reply = `User '${result.name}' ID ${result._id} deleted`
    res.json(reply)
}

module.exports = {addUser,getAllUser,getUserById,updateUser,deleteUsers}
