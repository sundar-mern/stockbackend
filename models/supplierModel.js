// supplierModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const supplierSchema = new Schema({
    suppname: String,
    phone: String,
    address: String
}, { versionKey: false });

module.exports = mongoose.model("Supplier", supplierSchema, "supplier");
