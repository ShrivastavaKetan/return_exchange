const express = require('express');
const { OrderExchange } = require('../models/orderExchange'); 
const { OrderReturn } = require('../models/orderReturn'); 
const { Order } = require('../models/Order'); 
const { Op } = require('sequelize');

const router = express.Router();

// Helper Function to Schedule Admin Review After 24 Hours
const scheduleAdminReview = (requestId, type) => {
  setTimeout(async () => {
    try {
      if (type === 'return') {
        const returnRequest = await OrderReturn.findByPk(requestId);
        if (returnRequest && returnRequest.status === 'Pending') {
          returnRequest.status = 'Admin Review';
          await returnRequest.save();
        }
      } else if (type === 'exchange') {
        const exchangeRequest = await OrderExchange.findByPk(requestId);
        if (exchangeRequest && exchangeRequest.status === 'Pending') {
          exchangeRequest.status = 'Admin Review';
          await exchangeRequest.save();
        }
      }
    } catch (err) {
      console.error('Error scheduling admin review:', err);
    }
  }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
};

// 1. Create Return/Exchange Request
router.post('/:type/request', async (req, res) => {
  try {
    const { orderId, reason } = req.body;
    const { type } = req.params;

    // Validate order
    const order = await Order.findByPk(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found.' });

    let request;
    if (type === 'return') {
      request = await OrderReturn.create({
        orderId,
        reason,
        status: 'Pending',
        sellerAction: null,
        adminAction: null,
        returnRequired: null,
      });
    } else if (type === 'exchange') {
      request = await OrderExchange.create({
        orderId,
        reason,
        status: 'Pending',
        sellerAction: null,
        adminAction: null,
        trackingLink: null,
      });
    } else {
      return res.status(400).json({ message: 'Invalid request type.' });
    }

    // Notify seller, admin, and customer
    console.log(`Notify: New ${type} request created.`);

    // Schedule admin review after 24 hours
    scheduleAdminReview(request.id, type);

    res.status(201).json({ message: `${type} request created successfully.`, request });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating request.' });
  }
});

// 2. Seller Action
router.put('/:type/seller-action/:id', async (req, res) => {
  try {
    const { action, reason, returnRequired } = req.body; // Seller's response
    const { type, id } = req.params;

    let request;
    if (type === 'return') {
      request = await OrderReturn.findByPk(id);
    } else if (type === 'exchange') {
      request = await OrderExchange.findByPk(id);
    } else {
      return res.status(400).json({ message: 'Invalid request type.' });
    }

    if (!request) return res.status(404).json({ message: 'Request not found.' });

    if (request.status !== 'Pending')
      return res.status(400).json({ message: 'Action already taken on this request.' });

    request.sellerAction = action; // Accept/Reject
    request.status = action === 'Accept' ? 'Admin Review' : 'Rejected';
    request.returnRequired = returnRequired || null;
    request.reason = reason || null;
    await request.save();

    // Notify customer and admin
    console.log(`Notify: Seller ${action}ed ${type} request.`);

    res.status(200).json({ message: `Seller action recorded successfully.`, request });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating request.' });
  }
});

// 3. Admin Review
router.put('/:type/admin-review/:id', async (req, res) => {
  try {
    const { action, returnRequired, trackingLink } = req.body;
    const { type, id } = req.params;

    let request;
    if (type === 'return') {
      request = await OrderReturn.findByPk(id);
    } else if (type === 'exchange') {
      request = await OrderExchange.findByPk(id);
    } else {
      return res.status(400).json({ message: 'Invalid request type.' });
    }

    if (!request) return res.status(404).json({ message: 'Request not found.' });

    if (request.status !== 'Admin Review')
      return res.status(400).json({ message: 'Request not ready for admin review.' });

    request.adminAction = action; // Approve/Reject
    request.status = action === 'Approve' ? 'Approved' : 'Rejected';
    if (type === 'return') {
      request.returnRequired = returnRequired || null;
    } else if (type === 'exchange') {
      request.trackingLink = trackingLink || null;
    }
    await request.save();

    // Notify customer and seller
    console.log(`Notify: Admin ${action}ed ${type} request.`);

    res.status(200).json({ message: `Admin review completed successfully.`, request });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error completing admin review.' });
  }
});

// 4. Communication (Status Updates)
// Already handled by log and status changes

module.exports = router;
