// categoryModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
    catname: String
}, { versionKey: false });

module.exports = mongoose.model("Category", categorySchema, "category");
