// customerController.js
const CustomerModel = require('../models/customerModel');
const SalesModel = require('../models/salesModel');

async function saveCustomer(req, res) {
    try {
        const newRecord = new CustomerModel(req.body);
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

async function fetchAllCustomers(req, res) {
    try {
        const result = await CustomerModel.find();
        if (result.length === 0) {
            res.send({ statuscode: 0 });
        } else {
            res.send({ statuscode: 1, data: result });
        }
    } catch (e) {
        res.send({ statuscode: -1, errCode: e.code });
    }
}

async function updateCustomer(req, res) {
    try {
        const updateresult = await CustomerModel.updateOne({ _id: req.body.custid }, { $set: { custname: req.body.custname, phone: req.body.phone, address: req.body.address } });
        if (updateresult.modifiedCount === 1) {
            res.send({ statuscode: 1 });
        } else {
            res.send({ statuscode: 0 });
        }
    } catch (e) {
        res.send({ statuscode: -1, errCode: e.code });
    }
}

async function deleteCustomer(req, res) {
    try
    {
        var result = await SalesModel.deleteMany({CustID:req.params.id})
        console.log(result)
        if(result)
        {
            var result2 = await CustomerModel.deleteOne({_id:req.params.id})
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
        res.send({statuscode:-1,errcode:e.code})
    }
}

module.exports = { saveCustomer, fetchAllCustomers, updateCustomer, deleteCustomer };
