const ReturnExchangeRequest = require('../models/returnExchangeRequest');
const { validateSellerModification } = require('../utils/validations');
const sequelize = require('../config/database');
const OrderModel = require('../models/Order')(sequelize);
const User = require('../models/User')(sequelize);
const OrderReturns = require('../models/orderReturns')
const OrderExchange = require('../models/orderExchange');


// Get all requests with filtering for returns or exchanges
exports.getAllRequests = async (req, res, next) => {
  try {
    const { requestType } = req.query; // Optional query parameter to filter by requestType
    const filter = {};

    if (requestType) {
      if (!['Return', 'Exchange'].includes(requestType)) {
        throw new Error('Invalid request type for filtering');
      }
      filter.requestType = requestType;
    }

    const requests = await ReturnExchangeRequest.findAll({ where: filter });
    res.status(200).json({ success: true, data: requests });
  } catch (error) {
    next(error);
  }
};

// Gett Request by ID
exports.getRequestById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const request = await ReturnExchangeRequest.findByPk(id);
    res.status(200).json({ success: true, data: request });
  } catch (error) {
    next(error);
  }
};

// Modify a specific request by ID
exports.modifyRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { sellerDecision, sellerReason, requestStatus } = req.body;

    validateSellerModification(req.body);

    const request = await ReturnExchangeRequest.findByPk(id);

    if (!request) {
      throw new Error('Request not found');
    }

    if (request.request_status === 'Pending' && request.request_status !== 'Approved' ) {
      if(request.request_type  === 'Return'){
        request.sellerDecision = sellerDecision;
        request.sellerReason = sellerReason;
        request.sellerResponseTime = new Date();
        request.requestStatus = sellerDecision === 'Accepted' ? 'Approved' : 'Rejected';
    
        await request.save();
        await OrderReturns.update({
          seller_decision: sellerDecision,
          seller_reason: sellerReason,
        }, { where: { request_id: id } });
        await ReturnExchangeRequest.update({
          request_status: requestStatus,
        }, { where: { request_id: id } });
    
        res.status(200).json({ success: true, data: request });
        
      }
      else if(request.request_type === 'Exchange'){
        request.sellerDecision = sellerDecision;
        request.sellerReason = sellerReason;
        request.sellerResponseTime = new Date();
        request.requestStatus = sellerDecision === 'Accepted' ? 'Approved' : 'Rejected';
    
        await request.save();

        try {
          await OrderExchange.update({
            seller_decision: sellerDecision,
            seller_reason: sellerReason,
          }, { where: { request_id: id } });
        } catch (error) {
          console.error('Error updating OrderExchange:', error);
          throw new Error('Failed to update OrderExchange');
        }

        try {
          await ReturnExchangeRequest.update({
            request_status: requestStatus,
          }, { where: { request_id: id } });
        } catch (error) {
          console.error('Error updating ReturnExchangeRequest:', error);
          throw new Error('Failed to update ReturnExchangeRequest');
        }
    
        res.status(200).json({ success: true, data: request });
      }
      
    }
    else{
      res.status(400).json({success:false, message: "Request is not pending or approved ! Only pending and approved requests can be modified"});
    }

    res.status(200).json({ success: true, data: request });
  } catch (error) {
    next(error);
  }
};
