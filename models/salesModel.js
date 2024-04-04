// salesModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const salesSchema = new Schema({
    _id: Number,
    CustID: { type: Schema.Types.ObjectId, ref: 'Customer' },
    BillAmount: Number,
    SalesDate: String
}, { versionKey: false });

module.exports = mongoose.model("Sale", salesSchema, "sale");
