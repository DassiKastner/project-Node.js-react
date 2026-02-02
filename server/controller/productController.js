const mongoose = require("mongoose")
const Product = require("../models/Producte");

const addProducte = async (req,res)=>{
    const {title, description, price, code, picture, company} = req.body
    const product = await Product.create({title, description, price, code, picture, company});
    res.json(product )
}

const getAllProductes = async (req,res)=>{
    const products = await Product.find().lean()
    if (!products?.length) { 
        return res.status(400).json({ message: 'No productes found' })
        }
       
        res.json(products)
}

const getProducteById = async(req,res)=>{
    const {id} = req.params
    const product = await Product.findById(id)
    res.json(product)
}

const updateProducte = async (req,res)=>{
    const {id} = req.params
    const {title, description, price, code, picture, company} = req.body
    const product = await Product.findById(id)
    product.title = title,
    product.description = description, 
    product.price = price,
    product.code = code, 
    product.picture = picture, 
    product.company = company
    const updateProducte = await product.save()
    res.json(updateProducte)
}

const deleteProducte = async (req,res)=>{
    const {id} = req.body
    const product = await Product.findById(id)
    if(!product){
        return res.send("No such product")
    }
    const result = await product.deleteOne()
    res.json("task deleted complete")
}

module.exports = {addProducte,getAllProductes,getProducteById,updateProducte,deleteProducte}
