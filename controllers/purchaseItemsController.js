const PurchaseItemsModel = require('../models/purchaseItemsModel');
const ProductModel = require('../models/productModel');

const savePurchaseItem = async (req, res) => {
    try
    {
        const purchasesToInsert = req.body.itemstobuy;

        const result = await PurchaseItemsModel.insertMany(purchasesToInsert);


        for (const purchase of purchasesToInsert) {
            const { pid, qty } = purchase;
            // Update stock for the product
            await ProductModel.updateOne({ _id: pid }, { $inc: { Stock: qty } });
        }

        if(result)
        {
            res.send({statuscode:1})
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
};

const fetchPurchaseItems = async (req, res) => {
    try 
    {
        const data = await PurchaseItemsModel.find({PurchID: req.query.purchid});
        if(data)
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


module.exports = { savePurchaseItem,fetchPurchaseItems };
