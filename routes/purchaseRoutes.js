// purchaseRoutes.js
const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');

// Routes for purchase
router.post('/savepurchase', purchaseController.savePurchase);
router.get('/fetchPurchaseId', purchaseController.fetchPurchaseId);
router.get('/fetchpurchases', purchaseController.fetchPurchases);
router.delete('/deletepurchase/:pid', purchaseController.deletePurchase);
module.exports = router;
