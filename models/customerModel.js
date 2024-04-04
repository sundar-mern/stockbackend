// customerModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerSchema = new Schema({
    custname: String,
    phone: String,
    address: String
}, { versionKey: false });

module.exports = mongoose.model("Customer", customerSchema, "customer");
