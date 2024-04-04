const express = require('express');
const router = express.Router();
const salesItemsController = require('../controllers/salesItemsController');

router.post("/savesaleitems", salesItemsController.saveSalesItem);
router.get('/fetchsalesitems', salesItemsController.fetchSalesItems);
module.exports = router;
