// userModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    phone: String,
    username: { type: String, unique: true },
    password: String,
    usertype: String
}, { versionKey: false });

module.exports = mongoose.model("UserRecord", userSchema, "UserRecord");
