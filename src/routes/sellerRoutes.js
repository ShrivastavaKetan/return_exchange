const express = require('express');
const sellerController = require('../controllers/sellerController');
const router = express.Router();

// Get all requests with optional filtering for returns or exchanges
router.get('/requests', sellerController.getAllRequests);  

// Get a specific request by ID
router.get('/requests/:id', sellerController.getRequestById);

// Modify a specific request by ID
router.put('/requests/:id', sellerController.modifyRequest);

module.exports = router;