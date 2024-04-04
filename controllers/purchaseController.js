// purchaseController.js
const PurchaseModel = require('../models/purchaseModel');

const PurchaseItemsModel = require('../models/purchaseItemsModel');

async function savePurchase(req, res) {
    try {
        const newRecord = new PurchaseModel({
            _id: req.body.purchid,
            SuppID: req.body.suppid,
            BillAmount: req.body.billamt,
            PurchaseDate: req.body.bdate
        });
        const result = await newRecord.save();
        if (result) {
            res.send({ statuscode: 1 });
        } else {
            res.send({ statuscode: 0 });
        }
    } catch (e) {
        res.send({ statuscode: -1, errCode: e.message });
    }
}

async function fetchPurchaseId(req, res) {
    try {
        const latestPurchase = await PurchaseModel.findOne().sort({ _id: -1 });
        let purchaseId;
        if (latestPurchase) {
            purchaseId = latestPurchase._id + 1;
        } else {
            purchaseId = 1;
        }
        res.json({ purchaseId });
    } catch (error) {
        res.status(500).json({ message: "Error generating purchase ID", error: error.message });
    }
}


// Delete a purchase
async function deletePurchase(req, res)  {
    try
    {
        var result = await PurchaseItemsModel.deleteMany({PurchID:req.params.pid})
        if(result)
        {
            var result2 = await PurchaseModel.deleteOne({_id:req.params.pid})
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
};

async function fetchPurchases(req, res)  {
    try 
    {
        const data = await PurchaseModel.find({
            PurchaseDate: { $gte: req.query.startdate, $lte: req.query.enddate }
        }).populate('SuppID').sort({ _id: -1 });
        if(data.length>0)
        {
            res.json({statuscode:1,data})
        }
        else
        {
            res.json({statuscode:0})
        }
    } 
    catch (error) 
    {
        res.status(500).json({ message: "Error", error: error.message });
    }
};

module.exports = { savePurchase, fetchPurchaseId,deletePurchase,fetchPurchases };
