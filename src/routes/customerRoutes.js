const express = require('express');
const CustomerController = require('../controllers/CustomerController');
const router = express.Router();

router.post('/requests', CustomerController.createRequest);
router.get('/requests/:id', CustomerController.getRequest);
router.get('/requests', CustomerController.getAllRequests);

module.exports = router;
