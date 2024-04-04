// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post("/createuser", userController.createUser);
router.post("/login", userController.loginUser);

module.exports = router;