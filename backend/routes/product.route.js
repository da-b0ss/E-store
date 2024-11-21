import express from "express";
import mongoose from "mongoose";
import Product from "../models/product.model.js";

const router = express.Router();

export default router;

router.get("/", async (req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json({success:true, data:products});
    } catch(error){
        console.error("Error in fetching the products:", error.message);
        res.status(500).json({success:false,message:"Server error"});
    }
});

//router.get("/products", (req, res) => {});
router.post("/", async (req, res) => {
    const product = req.body; // user will send this data 

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false, message:"Provide all fields"});
    }

    const newProduct = new Product(product);

    try{
        await newProduct.save();
        res.status(201).json({success:true, data:newProduct});
    } catch(error){
        console.error("Error in create product:", error.message);
        res.status(500).json({success:false,message:"Server error"});
    }
});

//Postman desktop router

/*router.get("/", (req, res) => {
    res.send("server is ready");
});*/
router.put("/:id", async (req, res) =>{
    const {id} = req.params;
    const product = req.body;
    
    //if(!mongoose.Types.ObjectId.isValid(id)){
    //    return res.status(404).json({success:false, message:"Invalid product id"});}

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({success:true, data: updatedProduct});
    }catch (error){
        res.status(500).json({success:false, message:"Server error"});
    }
});

//console.log(process.env.MONGO_URI);

router.delete("/:id", async (req, res) => {
    const {id} = req.params;
    
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true, message:"Product deleted"});
    }catch (error){
        console.error("Error when deleting the product:", error.message);
        res.status(404).json({success:false, message:"Product not found"});
    }
});