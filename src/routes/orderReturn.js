const express = require('express');
const router = express.Router();
const { OrderReturn } = require('../models/orderReturn');

// POST: Create a new OrderReturn
router.post('/', async (req, res) => {
  try {
    const { orderId, reason, returnRequired } = req.body;
    
    // Create a new OrderReturn record
    const newOrderReturn = await OrderReturnModel.create({
      orderId,
      reason,
      returnRequired,
    });

    return res.status(201).json(newOrderReturn);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// GET: Fetch all OrderReturns
router.get('/', async (req, res) => {
  try {
    const orderReturns = await OrderReturnModel.findAll();
    return res.status(200).json(orderReturns);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// GET: Fetch OrderReturn by ID
router.get('/orderreturns/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const orderReturn = await OrderReturnModel.findByPk(id);
    if (!orderReturn) {
      return res.status(404).json({ message: 'OrderReturn not found' });
    }
    return res.status(200).json(orderReturn);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// PUT: Update an OrderReturn
router.put('/orderreturns/:id', async (req, res) => {
  const { id } = req.params;
  const { reason, status, sellerAction, adminAction, returnRequired, reasonForSellerAction, reasonForAdminAction } = req.body;
  
  try {
    const orderReturn = await OrderReturnModel.findByPk(id);
    if (!orderReturn) {
      return res.status(404).json({ message: 'OrderReturn not found' });
    }

    OrderReturnModel.reason = reason || OrderReturnModel.reason;
    OrderReturnModel.status = status || OrderReturnModel.status;
    OrderReturnModel.sellerAction = sellerAction || OrderReturnModel.sellerAction;
    OrderReturnModel.adminAction = adminAction || OrderReturnModel.adminAction;
    OrderReturnModel.returnRequired = returnRequired || OrderReturnModel.returnRequired;
    OrderReturnModel.reasonForSellerAction = reasonForSellerAction || OrderReturnModel.reasonForSellerAction;
    OrderReturnModel.reasonForAdminAction = reasonForAdminAction || OrderReturnModel.reasonForAdminAction;

    await OrderReturnModel.save();
    
    return res.status(200).json(orderReturn);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// DELETE: Delete an OrderReturn
router.delete('/orderreturns/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const orderReturn = await OrderReturnModel.findByPk(id);
    if (!orderReturn) {
      return res.status(404).json({ message: 'OrderReturn not found' });
    }

    await OrderReturnModel.destroy();
    return res.status(200).json({ message: 'OrderReturn deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// GET: Fetch OrderReturns by status
router.get('/orderreturns/status/:status', async (req, res) => {
  const { status } = req.params;

  try {
    const orderReturns = await OrderReturnModel.findAll({
      where: { status },
    });

    return res.status(200).json(orderReturns);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// PUT: Admin approves/rejects an order return
router.put('/orderreturns/admin/:id', async (req, res) => {
  const { id } = req.params;
  const { adminAction, reasonForAdminAction } = req.body;
  
  try {
    const orderReturn = await OrderReturnModel.findByPk(id);
    if (!orderReturn) {
      return res.status(404).json({ message: 'OrderReturn not found' });
    }

    OrderReturnModel.adminAction = adminAction;
    OrderReturnModel.reasonForAdminAction = reasonForAdminAction || OrderReturnModel.reasonForAdminAction;

    await OrderReturnModel.save();
    
    return res.status(200).json(orderReturn);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
