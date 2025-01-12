const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import your database configuration

module.exports = (sequelize) => {
  class Order extends Model {
    static associate(models) {
      // Define association with User
      Order.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      // Define association with OrderItem
      Order.hasMany(models.OrderItem, { foreignKey: 'order_id', as: 'items' });
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

  return Order;
};
