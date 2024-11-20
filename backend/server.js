import express from "express"; 
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import Product from "./models/product.model.js";

dotenv.config();

const app = express();

app.use(express.json()); //allows us to accept JSON data in the req.body

//app.get("/products", (req, res) => {});
app.post("/api/products", async (req, res) => {
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

//Postman desktop app

/*app.get("/", (req, res) => {
    res.send("server is ready");
});*/

//console.log(process.env.MONGO_URI);
app.delete("/api/products/:id", async (req, rest) => {
    const {id} = req.params;
    console.log("id:", id);
});

app.listen(5000, () => {
    connectDB();
    console.log("Server started @ http://localhost:5000");
});