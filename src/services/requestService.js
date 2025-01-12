// src/services/requestService.js
const Request = require('../models/Request');

async function createRequest(data) {
  const request = await Request.create(data);
  return request;
}

async function sellerAction(requestId, action, details) {
  const request = await Request.findByPk(requestId);
  if (!request) throw new Error('Request not found.');

  if (request.status !== 'pending') {
    throw new Error('Cannot update a non-pending request.');
  }

  request.sellerResponse = details.reason || null;
  request.returnRequired = details.returnRequired || false;

  if (action === 'accept') {
    request.status = 'approved';
  } else {
    request.status = 'rejected';
  }

  await request.save();
  return request;
}

async function adminReview(requestId, decision, details) {
  const request = await Request.findByPk(requestId);
  if (!request) throw new Error('Request not found.');

  request.adminDecision = details.reason || null;
  request.status = decision;

  await request.save();
  return request;
}

module.exports = { createRequest, sellerAction, adminReview };
