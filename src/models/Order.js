const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import your database configuration
const OrderReturns = require('./orderReturns');
const OrderExchange = require('./orderExchange');

module.exports = (sequelize) => {
  class Order extends Model {
    static associate(models) {
      // Define association with User
      Order.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      Order.hasMany(models.OrderReturns, { foreignKey: 'order_id', as: 'returns' });
      Order.hasMany(models.OrderExchange, { foreignKey: 'order_id', as: 'exchanges' });
    }
  }

  Order.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      order_number: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      order_status: {
        type: DataTypes.ENUM('Pending', 'Shipped', 'Delivered', 'Cancelled'),
        allowNull: false,
        defaultValue: 'Pending',
      },
      payment_status: {
        type: DataTypes.ENUM('Paid', 'Failed', 'Refunded', 'Pending'),
        allowNull: false,
        defaultValue: 'Pending',
      },  
      payment_mode: {
        type: DataTypes.ENUM('Card', 'UPI', 'Wallet', 'COD'),
        allowNull: false,
      },  
      discounts_charges_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'discounts_charges',
          key: 'id',
        },
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Order',
      tableName: 'orders',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  Order.hasMany(OrderReturns, { foreignKey: 'order_id', onDelete: 'CASCADE' });
  OrderReturns.belongsTo(Order, { foreignKey: 'order_id' });
  Order.hasMany(OrderExchange, { foreignKey: 'order_id', onDelete: 'CASCADE' });
  OrderExchange.belongsTo(Order, { foreignKey: 'order_id' });

  return Order;
};
