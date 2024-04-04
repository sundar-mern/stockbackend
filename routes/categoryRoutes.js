// categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Routes for category
router.post('/savecategory', categoryController.saveCategory);
router.get('/fetchallcat', categoryController.fetchAllCategories);
router.put('/updatecategory', categoryController.updateCategory);
router.delete('/deletecat/:cid', categoryController.deleteCategory);
module.exports = router;
