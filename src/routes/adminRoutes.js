const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.put('/requests/:id/review', adminController.reviewRequest);

module.exports = router;
