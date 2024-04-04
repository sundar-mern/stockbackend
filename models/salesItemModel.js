const mongoose = require('mongoose');

const SalesItemsSchema = new mongoose.Schema({
    SaleID: { type: Number, ref: 'Sale' },
    pid: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    pname: String,
    rate: Number,
    qty: Number,
    tc: Number,
    pic: String
}, { versionKey: false });

module.exports = mongoose.model("saleitems", SalesItemsSchema, "saleitems");
