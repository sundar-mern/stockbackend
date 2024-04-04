const SalesModel = require('../models/salesModel');
const SalesItemsModel = require('../models/salesItemModel');

// Controller functions for Sales module

// Save a sale
const saveSale = async (req, res) => {
    try
    {
        var newrecord = new SalesModel({_id:req.body.saleid,CustID:req.body.custid,BillAmount:req.body.billamt,SalesDate:req.body.bdate});

        var result = await newrecord.save();

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

// Fetch the next sale ID
const fetchSaleId = async (req, res) => {
    try {
        const latestSale = await SalesModel.findOne().sort({_id: -1 });
        let saleId;
        if (latestSale) {
            saleId = latestSale._id + 1;
        } else {
            // If no purchase exists yet, start with 1
            saleId = 1;
        }
        res.json({ saleId });
    } catch (error) {
        res.status(500).json({ message: "Error generating sale ID", error: error.message });
    }
};

// Fetch sales data
const fetchSales = async (req, res) => {
    try 
    {
        const data = await SalesModel.find({
            SalesDate: { $gte: req.query.startdate, $lte: req.query.enddate }
        }).populate('CustID').sort({ _id: -1 });
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



// Delete a sale
const deleteSales = async (req, res) => {
    try
    {
        var result = await SalesItemsModel.deleteMany({SaleID:req.params.id})
        if(result)
        {
            var result2 = await SalesModel.deleteOne({_id:req.params.id})
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

module.exports = { saveSale,fetchSaleId,fetchSales,deleteSales};