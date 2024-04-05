// productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer  = require('multer');
var picname;

let mystorage = multer.diskStorage({
    destination: (req, file, cb) => 
    {
      cb(null, "uploads");
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
