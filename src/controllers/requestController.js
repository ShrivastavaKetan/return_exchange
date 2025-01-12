// src/controllers/requestController.js
const { createRequest, sellerAction, adminReview } = require('../services/requestService');

const create = async (req, res) => {
  try {
    const request = await createRequest(req.body);
    res.status(201).json(request);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const handleSellerAction = async (req, res) => {
  try {
    const { action } = req.params;
    const request = await sellerAction(req.params.id, action, req.body);
    res.json(request);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const handleAdminReview = async (req, res) => {
  try {
    const { decision } = req.params;
    const request = await adminReview(req.params.id, decision, req.body);
    res.json(request);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { create, handleSellerAction, handleAdminReview };
