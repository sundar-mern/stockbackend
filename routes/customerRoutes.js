// customerRoutes.js
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Routes for customer
router.post('/savecustomer', customerController.saveCustomer);
router.get('/fetchallcust', customerController.fetchAllCustomers);
router.put('/updatecust', customerController.updateCustomer);
router.delete('/delcust/:id', customerController.deleteCustomer);

module.exports = router;
