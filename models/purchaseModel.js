// purchaseModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const purchaseSchema = new Schema({
    _id: Number,
    SuppID: { type: Schema.Types.ObjectId, ref: 'Supplier' },
    BillAmount: Number,
    PurchaseDate: String
}, { versionKey: false });

module.exports = mongoose.model("Purchase", purchaseSchema, "purchase");
