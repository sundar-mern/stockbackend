// productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer  = require('multer');
var picname;

const fs = require('fs');

// Create the uploads directory if it doesn't exist
const uploadsDir = '/opt/render/project/uploads';
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

let mystorage = multer.diskStorage({
    destination: (req, file, cb) => 
    {
      cb(null, uploadsDir);
    },
    filename: (req, file, cb) => 
    {
      picname = Date.now() + file.originalname;
      cb(null, picname);
    }
  });
  let upload = multer({ storage: mystorage });

router.post('/saveproduct',  upload.single('prodpic'),productController.saveProduct);
router.put('/updateproduct',  upload.single('prodpic'),productController.updateproduct);
router.get('/fetchproductsbycat/:cid', productController.fetchProductsByCategory);
router.get('/fetchproductbyprodid', productController.fetchprodbyid);
router.delete('/delproduct/:id', productController.deleteProduct);

module.exports = router;
