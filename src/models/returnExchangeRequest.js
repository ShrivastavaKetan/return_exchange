const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ReturnExchangeRequest = sequelize.define('return_exchange_requests', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  order_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'orders',
      key: 'id',
    },
  },
  product_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id',
    },
  },
  request_type: {
    type: DataTypes.ENUM('Return', 'Exchange'),
    allowNull: false,
  },
  request_status: {
    type: DataTypes.ENUM('Pending', 'In Progress', 'Approved', 'Rejected', 'Cancelled'),
    defaultValue: 'Pending',
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'return_exchange_requests',
  timestamps: false,
  hooks: {
    beforeCreate: (request) => {
      request.user_id = request.user_id;
      request.order_id = request.order_id;
      request.product_id = request.product_id;
    },
  },
});

module.exports = ReturnExchangeRequest;