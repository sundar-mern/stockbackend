// productModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    CatID: { type: Schema.Types.ObjectId, ref: 'Category' },
    ProdName: String,
    PurchaseRate: Number,
    SellingRate: Number,
    Stock: Number,
    Picture: String
}, { versionKey: false });

module.exports = mongoose.model("Product", productSchema, "product");
