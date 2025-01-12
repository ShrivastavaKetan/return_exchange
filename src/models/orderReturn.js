const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import the Sequelize instance

const OrderReturn = sequelize.define('OrderReturn', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Orders', // References the Orders table
      key: 'id',
    },
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Admin Review', 'Approved', 'Rejected'),
    allowNull: false,
    defaultValue: 'Pending',
  },
  sellerAction: {
    type: DataTypes.ENUM('Accept', 'Reject'),
    allowNull: true,
  },
  adminAction: {
    type: DataTypes.ENUM('Approve', 'Reject'),
    allowNull: true,
  },
  returnRequired: {
    type: DataTypes.BOOLEAN,
    allowNull: true, // Specifies whether a return pickup is required
  },
  reasonForSellerAction: {
    type: DataTypes.STRING,
    allowNull: true, // Optional reason for the seller's action
  },
  reasonForAdminAction: {
    type: DataTypes.STRING,
    allowNull: true, // Optional reason for the admin's action
  },
}, {
  timestamps: true, // Includes createdAt and updatedAt timestamps
  tableName: 'OrderReturns',
});

module.exports = OrderReturn;
