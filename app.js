const express = require("express");
const productData = require("./src/model/productData");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
app.use(cors());

require("dotenv").config();
const port = process.env.PORT||8080;
const path=require('path');
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGODB_URL);

app.use(express.static(path.join(__dirname,'./Client/build')))


app.use(cors());

app.get('/',function(req,res){
    res.send("API responds correctly.")
})

app.get('/api/products', function(req,res){

    res.header("Access-control-Allow-Origin","*")
    res.header('Access-control-Methods:GET,POST,PUT,DELETE');
    productData.find().then(function(products){
        res.send(products);
    })
})
app.post('/insert',bodyParser.json(), function(req,res){
    res.header("Access-Control-Allow-origin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PUT,DELETE');
    console.log(req.body);
    var product = {
        productID:req.body.product.productID,
    productName:req.body.product.productName,
    productName:req.body.product.productCode,
    releaseDate:req.body.product.releaseDate,
    description:req.body.product.description,
    price:req.body.product.price,
    starRating:req.body.product.starRating,
    ImageUrl:req.body.product.ImageUrl
    }
    var product = new productData(product);
    product.save();
})
// app.listen(4710,()=>{
    console.log("server started...")
//});


app.get('/*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'));
})
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URL);
      console.log(`MongoDB Connected: `);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
connectDB().then(() => {
    app.listen(port, () => {
        console.log("listening for requests on ",port);
    })
})