const Cart = require("../models/Cart")

const addCart = async (req,res)=>{
    const {product} = req.body
    const user = req.user._id
    if(!product){
        return res.status(400).json({message: "product is reqiured"})
    }
    const cart = await Cart.create({user,product});
    res.json(cart)
}

const getAllCart = async (req,res)=>{
    const id = req.user._id
    const allCarts = await Cart.find({user:id}).populate("product")
    if (!allCarts?.length) 
    { 
        return res.status(400).json({ message: 'No items in cart found' })
    }
    res.json(allCarts)
}
const getCartById = async(req,res)=>{
    const {id} = req.params
    const cart = await Cart.findById(id).lean()
    if(!cart){
        return res.status(400).json({ message: 'No items in cart found' })
    }
    res.json(cart)
}

const updateCart = async (req,res)=>{
    const {id,body, articlei,  active, taskDate, icon, range } = req.body
    const cart = await Cart.findById(id)
    task.body = body,
    task.articlei = articlei, 
    task.active = active,
    task.writer = writer, 
    task.icon = icon,
    task.taskDate = taskDate
    const updatearticle = await cart.save()
    res.json(cart)
}

const deleteCart = async (req,res)=>{
    const {id} = req.params
    const cart = await Cart.findById(id)
    const delet = await cart.deleteOne()
    res.json("task deleted complete")
}

const deleteAllCart = async (req, res) => {
    try {
        const userId = req.user._id;

        await Cart.deleteMany({ user: userId });

        res.json({ message: "cart deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "failed to delete cart" });
    }
};

module.exports={addCart,getAllCart,getCartById,updateCart,deleteCart,deleteAllCart}