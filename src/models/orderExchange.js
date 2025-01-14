const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Order = require('./Order');
const OrderReturns = require('./orderReturns');
// const OrderExchange = require('./orderExchange');

const OrderExchange = sequelize.define('order_exchange', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  request_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'return_exchange_requests',
      key: 'id',
    },
  },
  exchange_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  exchange_amount: {
    type: DataTypes.REAL,
    defaultValue: 0.00
  },
  taxes: {
    type: DataTypes.REAL,
    defaultValue: 0.00
  },
  discount: {
    type: DataTypes.REAL,
    defaultValue: 0.00
  },
  total_amount: {
    type: DataTypes.REAL,
    defaultValue: 0.00
  },
  exchange_reason: {
    type: DataTypes.TEXT,
    defaultValue: "NA"
  },
  admin_decision: {
    type: DataTypes.TEXT,
    validate: {
        isIn: [['Approved', 'Rejected', 'Escalated']]
    },
    defaultValue: null
  },
  seller_decision: {
      type: DataTypes.TEXT,
      validate: {
          isIn: [['Accepted', 'Rejected', 'Pending']]
      },
      defaultValue: null
  },
    exchange_pickup_status: {
      type: DataTypes.TEXT,
          validate: {
              isIn: [['Scheduled', 'In Transit', 'Completed']]
          },
          defaultValue: null
    },
  exchange_delivery_status: {
    type: DataTypes.TEXT,
    allowNull: null,
  },
  exchange_tracking_id: {
    type: DataTypes.TEXT,
    allowNull: null,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'OrderExchange',
  timestamps: false // Set to true if you want Sequelize to manage createdAt and updatedAt
});


module.exports = OrderExchange;
