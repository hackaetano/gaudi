const express = require('express');
const router = express.Router();
const constants = require('../config/constants');
const propertiesController = require('../controllers/propertiesController');

// Routes: Sites
router.get('/properties', propertiesController.get);

module.exports = router;
