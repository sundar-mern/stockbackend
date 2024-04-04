// productController.js
const ProductModel = require('../models/productModel');
const fs = require('fs');
async function saveProduct(req, res) {
      try {
        let picname = "defaultpic.jpg"; // Default picture name
        
        if (req.file) {
            picname = req.file.filename; // Use the filename generated by Multer
        }

        const newRecord = new ProductModel({
            CatID: req.body.catid,
            ProdName: req.body.prodname,
            PurchaseRate: req.body.prate,
            SellingRate: req.body.srate,
            Stock: req.body.stock,
            Picture: picname
        });

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

async function fetchProductsByCategory(req, res) {
    try {
        const result = await ProductModel.find({ CatID: req.params.cid });
        if (result.length === 0) {
            res.send({ statuscode: 0 });
        } else {
            res.send({ statuscode: 1, prodsdata: result });
        }
    } catch (e) {
        res.send({ statuscode: -1, errCode: e.code });
    }
}

async function deleteProduct(req, res) {
    try {
        const result = await ProductModel.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 1) {
            res.send({ statuscode: 1 });
        } else {
            res.send({ statuscode: 0 });
        }
    } catch (e) {
        res.send({ statuscode: -1, errCode: e.code });
    }
}

async function fetchprodbyid(req, res) {
    try
    {
        var result = await ProductModel.findById(req.query.prodid);

        if(result)
        {
            res.send({statuscode:1,proddata:result})
        }
        else
        {
            res.send({statuscode:0});
        }
    }
    catch(e)
    {
        res.send({statuscode:-1,errcode:e.code})
    }
}

async function updateproduct(req, res) {
    if (!req.file)
    {
        picname=req.body.oldpicname;
    }
    else
    {
    picname=req.file.filename;
      if(req.body.oldpicname!="defaultpic.jpg")
      {
        fs.unlinkSync('../public/uploads/' + req.body.oldpicname);
      }
    }

    var updateresult = await ProductModel.updateOne({ _id: req.body.pid }, { $set: {CatID:req.body.catid,ProdName:req.body.prodname,PurchaseRate:req.body.prate,SellingRate:req.body.srate,Stock:req.body.stock,Picture:picname}});
    
    if(updateresult.modifiedCount===1)
    {
        res.send({statuscode:1});
    }
    else
    {
        res.send({statuscode:0})
    }
    
}

module.exports = { saveProduct, fetchProductsByCategory, deleteProduct, fetchprodbyid,updateproduct};
