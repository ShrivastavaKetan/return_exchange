exports.validateRequestCreation = (data) => {
    if (!data.userId || !data.orderId || !data.productId || !data.requestType) {
      throw new Error('Missing required fields');
    }
    if (!['Return', 'Exchange'].includes(data.requestType)) {
      throw new Error('Invalid request type');
    }
  };
  
  exports.validateSellerModification = (data) => {
    const { sellerDecision, sellerReason } = data;
  
    if (!['Accepted', 'Rejected'].includes(sellerDecision)) {
      throw new Error('Invalid seller decision');
    }
  
    if (sellerDecision === 'Rejected' && !sellerReason) {
      throw new Error('Reason is required for rejection');
    }
  };
  

  
