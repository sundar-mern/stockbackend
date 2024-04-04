// categoryController.js
const CatModel = require('../models/categoryModel');

async function saveCategory(req, res) {
    try {
        console.log(req.body.cname);
        var newrecord = new CatModel({ catname: req.body.cname });
        var result = await newrecord.save();
        if (result) {
            res.send({ statuscode: 1 });
        } else {
            res.send({ statuscode: 0 });
        }
    } catch (e) {
        res.send({ statuscode: -1, errcode: e.code });
    }
}

async function fetchAllCategories(req, res) {
    try {
        var result = await CatModel.find();
        if (result.length === 0) {
            res.send({ statuscode: 0 });
        } else {
            res.send({ statuscode: 1, catdata: result });
        }
    } catch (e) {
        res.send({ statuscode: -1, errcode: e.code });
    }
}

async function deleteCategory(req, res) {
    try {
        var result = await CatModel.deleteOne({ _id: req.params.cid });
        if (result.deletedCount === 1) {
            res.send({ statuscode: 1 });
        } else {
            res.send({ statuscode: 0 });
        }
    } catch (e) {
        res.send({ statuscode: -1, errcode: e.code });
    }
}

async function updateCategory(req, res) {
    try {
        var updateresult = await CatModel.updateOne({ _id: req.body.cid }, { $set: { catname: req.body.cname } });
        if (updateresult.modifiedCount === 1) {
            res.send({ statuscode: 1 });
        } else {
            res.send({ statuscode: 0 });
        }
    } catch (e) {
        res.send({ statuscode: -1, errcode: e.code });
    }
}

module.exports = { saveCategory, fetchAllCategories, deleteCategory, updateCategory };
