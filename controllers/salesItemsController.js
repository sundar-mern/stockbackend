const SalesItemsModel = require('../models/salesItemModel');
const ProductModel = require('../models/productModel');

const saveSalesItem = async (req, res) => {
    try
    {
        const salesToInsert = req.body.itemstosell;

        const result = await SalesItemsModel.insertMany(salesToInsert);


        for (const sale of salesToInsert) {
            const { pid, qty } = sale;
            // Update stock for the product
            await ProductModel.updateOne({ _id: pid }, { $inc: { Stock: -qty } });
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

// Fetch sales items
const fetchSalesItems = async (req, res) => {
    try 
    {
        const data = await SalesItemsModel.find({SaleID: req.query.saleid});
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

module.exports = { saveSalesItem,fetchSalesItems};
