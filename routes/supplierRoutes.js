// supplierRoutes.js
const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

// Routes for supplier
router.post('/savesupplier', supplierController.saveSupplier);
router.get('/fetchallsupp', supplierController.fetchAllSuppliers);
router.put('/updatesupp', supplierController.updateSupplier);
router.delete('/delsupp/:id', supplierController.deleteSupplier);

module.exports = router;
