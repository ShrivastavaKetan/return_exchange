const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as necessary

class OrderReturns extends Model {}

OrderReturns.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'orders', // Name of the referenced model
            key: 'id'
        }
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products', // Name of the referenced model
            key: 'id'
        }
    },
    return_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    return_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    taxes: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: '0.00'
    },
    discount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: '0.00'
    },
    total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'),
        defaultValue: 'Pending'
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'OrderReturns',
    tableName: 'order_returns',
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = OrderReturns; 