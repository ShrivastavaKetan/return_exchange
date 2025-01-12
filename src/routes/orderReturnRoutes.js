const express = require('express');
const router = express.Router();
const OrderReturns = require('../models/orderReturns'); // Adjust the path as necessary

// Route to create an order return request
router.post('/', async (req, res) => {
    const {
        order_id,
        product_id,
        return_quantity,
        return_amount,
        taxes,
        discount,
        total_amount,
        status
    } = req.body;

   try{
    const newOrderReturn = await OrderReturns.create({
        order_id,
        product_id,
        return_quantity,
        return_amount,
        taxes,
        discount,
        total_amount,
        status
    });
    console.log(newOrderReturn,"newOrderReturn")
        return res.status(201).json({
            message: 'Order return request created successfully',
            data: newOrderReturn
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error creating order return request',
            error: error.message
        });
    }
    });

router.get('/', async (req, res) => {
    const orderReturns = await OrderReturns.findAll();
    res.json(orderReturns);
  });

// New route for admin to review return requests
router.post('/admin/review-return/:id', async (req, res) => {
    const { id } = req.params; // Get the return request ID from the URL
    const { status, reason } = req.body; // Get status and reason from request body

    // Validate input
    if (!['Approved', 'Rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    try {
        // Find the return request by ID
        const returnRequest = await OrderReturns.findByPk(id);
        if (!returnRequest) {
            return res.status(404).json({ message: 'Return request not found' });
        }

        // Update the return request status
        returnRequest.status = status;
        returnRequest.reason = reason || null; // Set reason if provided
        await returnRequest.save();

        return res.status(200).json({ message: 'Return request updated successfully', returnRequest });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router; 