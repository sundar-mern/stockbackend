const express = require('express');
const router = express.Router();
const SalesController = require('../controllers/salesController');

// Routes for Sales module
router.post('/savesale', SalesController.saveSale);
router.get('/fetchSaleId', SalesController.fetchSaleId);
router.get('/fetchsales', SalesController.fetchSales);
router.delete('/deletesales/:id', SalesController.deleteSales);
module.exports = router;
