const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Order = require('./Order');

const OrderExchange = sequelize.define('OrderExchange', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Order,
      key: 'id',
    },
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Requested',
  },
}, {
  timestamps: true,
});

Order.hasMany(OrderExchange, { foreignKey: 'order_id', onDelete: 'CASCADE' });
OrderExchange.belongsTo(Order, { foreignKey: 'order_id' });

module.exports = OrderExchange;
