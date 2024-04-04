// supplierController.js
const SupplierModel = require('../models/supplierModel');
const PurchaseModel = require('../models/purchaseModel');
const supplierModel = require('../models/supplierModel');

async function saveSupplier(req, res) {
    try {
        const newRecord = new SupplierModel(req.body);
        const result = await newRecord.save();
        if (result) {
            res.send({ statuscode: 1 });
        } else {
            res.send({ statuscode: 0 });
        }
    } catch (e) {
        res.send({ statuscode: -1, errCode: e.code });
    }
}

async function fetchAllSuppliers(req, res) {
    try {
        const result = await SupplierModel.find();
        if (result.length === 0) {
            res.send({ statuscode: 0 });
        } else {
            res.send({ statuscode: 1, data: result });
        }
    } catch (e) {
        res.send({ statuscode: -1, errCode: e.code });
    }
}

async function updateSupplier(req, res) {
    try {
        const updateresult = await SupplierModel.updateOne({ _id: req.body.suppid }, { $set: { suppname: req.body.suppname, phone: req.body.phone, address: req.body.address } });
        if (updateresult.modifiedCount === 1) {
            res.send({ statuscode: 1 });
        } else {
            res.send({ statuscode: 0 });
        }
    } catch (e) {
        res.send({ statuscode: -1, errCode: e.code });
    }
}

async function deleteSupplier(req, res) {
    try
    {
        var result = await PurchaseModel.deleteMany({SuppID:req.params.id})
        console.log(result);
        if(result)
        {
            var result2 = await supplierModel.deleteOne({_id:req.params.id})
            if(result2.deletedCount===1)
            {
                res.send({statuscode:1});
            }
            else
            {
                res.send({statuscode:0})
            }
        }
        else
        {
            res.send({statuscode:0})
        }
       
    }
    catch(e)
    {
        res.send({statuscode:-1,errcode:e.message})
    }
}

module.exports = { saveSupplier, fetchAllSuppliers, updateSupplier, deleteSupplier };
