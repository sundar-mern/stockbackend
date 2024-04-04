const mongoose = require('mongoose');

const PurchaseItemsSchema = new mongoose.Schema({
    PurchID: { type: Number, ref: 'Purchase' },
    pid: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    pname: String,
    rate: Number,
    qty: Number,
    tc: Number,
    pic: String
}, { versionKey: false });

module.exports = mongoose.model("purchaseitems", PurchaseItemsSchema, "purchaseitems");
