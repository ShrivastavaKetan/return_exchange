const express = require('express');
const router = express.Router();
const sequelize = require('../config/database');
const user = require('../models/User');
const OrderModel = require('../models/Order')(sequelize);
const User = require('../models/User')(sequelize);
//const OrderItem = require('../models/orderItem')(sequelize);
// Import the necessary models
//const { OrderExchange } = require('../models/orderExchange');
//const { OrderReturn } = require('../models/orderReturn');

console.log(OrderModel.findAll(),"ORDER")
// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await OrderModel.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
});

// Get order details by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await OrderModel.findByPk(req.params.id)
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order); // Return the order details with associations
  } catch (error) {
    res.status(500).json({ error: 'Error fetching order details', details: error.message }); // Enhanced error response
  }
});

// Create a new order
router.post('/', async (req, res) => {
  const { user_id, product_id,status, payment_status, payment_mode, discounts_charges_id, order_number } = req.body;

  // Validate required fields
  if (!user_id || !payment_mode || !discounts_charges_id || !order_number) {
    return res.status(400).json({ error: 'user ID, payment mode, discounts charges ID, and order number are required' });
  }
  try {
    const newOrder = await OrderModel.create({
      user_id,
      product_id,
      status: status || 'Pending', // Default to 'Pending' if not provided
      payment_status: payment_status || 'Pending', // Default to 'Pending' if not provided
      payment_mode,
      discounts_charges_id,
      order_number,
    });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: 'Error creating order', details: error.message });
  }
});

// Handle an exchange request
router.post('/:id/exchange', async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrderModel.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    const newExchange = await OrderExchange.create({
      ...req.body,
      order_id: id,
    });
    res.status(201).json(newExchange);
  } catch (error) {
    res.status(400).json({ error: 'Error creating exchange request' });
  }
});

// Handle a return request
router.post('/:id/return', async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrderModel.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    const newReturn = await OrderReturn.create({
      ...req.body,
      order_id: id,
    });
    res.status(201).json(newReturn);
  } catch (error) {
    res.status(400).json({ error: 'Error creating return request' });
  }
});

module.exports = router;
