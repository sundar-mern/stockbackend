const express = require('express');
const router = express.Router();
const purchaseItemsController = require('../controllers/purchaseItemsController');

router.post("/savepurchitems", purchaseItemsController.savePurchaseItem);
router.get("/fetchpurchaseitems", purchaseItemsController.fetchPurchaseItems);



module.exports = router;
