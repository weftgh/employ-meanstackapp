const mongoose = require("mongoose");

require("dotenv").config();
mongoose.connect(process.env.MONGODB_URL)
// mongoose.connect("mongodb+srv://ABHISHEK:GATTO5783@cluster0.m13k8ca.mongodb.net/ProductsDB");

//Schema definition

const Schema = mongoose.Schema;
const productSchema = new Schema({
    productID:Number,
    productName:String,
    productCode:String,
    releaseData:String,
    description:String,
    price:String,
    starRating:Number,
    ImageURL:String

});
//Model creation
var productData = mongoose.model('products',productSchema);

module.exports = productData;