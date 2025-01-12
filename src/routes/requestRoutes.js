// src/routes/requestRoutes.js
const express = require('express');
const { create, handleSellerAction, handleAdminReview } = require('../controllers/requestController');
const router = express.Router();

router.post('/', create);
router.post('/:id/seller/:action', handleSellerAction);
router.post('/:id/admin/:decision', handleAdminReview);

module.exports = router;
