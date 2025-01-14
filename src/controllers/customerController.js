const ReturnExchangeRequest = require('../models/returnExchangeRequest');
const { validateRequestCreation } = require('../utils/validations');
const sequelize = require('../config/database');
const OrderModel = require('../models/Order')(sequelize);
const User = require('../models/User')(sequelize);
const OrderReturns = require('../models/orderReturns');
const OrderExchange = require('../models/orderExchange');

exports.createRequest = async (req, res, next) => {
  try {
    const { userId, orderId, productId, requestType, quantity, reason } = req.body;

    validateRequestCreation(req.body);
    let orderReturn = null;
    const newRequest = await ReturnExchangeRequest.create({
      user_id: userId,
      order_id: orderId,
      product_id: productId,
      request_type: requestType,
      request_status: "Pending",
    });

    if (requestType === 'Return') {
         orderReturn = await OrderReturns.create({
        request_id: newRequest.id,
        return_quantity: quantity,
        return_reason: reason,

      });
    }
    if (requestType === 'Exchange') {
      orderReturn = await OrderExchange.create({
        request_id: newRequest.id,
        exchange_quantity: quantity,
        exchange_reason: reason,
      });
    }
    else{
      throw new Error('Invalid request type');
    }
    //to complete the logic for exchange

    const resData = {orderReturn,newRequest}
    res.status(201).json({ success: true, data: resData });
  } catch (error) {
    console.error('Error creating request:', error);
    next(error);
  }
};  

exports.getRequest = async (req, res, next) => {
  try {
    const request = await ReturnExchangeRequest.findByPk(req.params.id);
    res.status(200).json({ success: true, data: request });
  } catch (error) {
    next(error);
  }
};  

exports.getAllRequests = async (req, res, next) => {
  try {
    const requests = await ReturnExchangeRequest.findAll();
    res.status(200).json({ success: true, data: requests });
  } catch (error) {
    next(error);
  }
};
