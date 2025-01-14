const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as necessary

const OrderReturn = sequelize.define('order_returns', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    request_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'return_exchange_requests', // Adjust the model name if necessary
            key: 'id'
        }
    },
    return_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    return_amount: {
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
    return_reason: {
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
    refund_status: {
        type: DataTypes.TEXT,
        validate: {
            isIn: [['Pending', 'Initiated', 'Issued']]
        },
        defaultValue: 'Pending'
    },
    return_pickup_status: {
        type: DataTypes.TEXT,
        validate: {
            isIn: [['Scheduled', 'In Transit', 'Completed']]
        },
        defaultValue: null
    },
    return_tracking_id: {
        type: DataTypes.TEXT,
        defaultValue: null
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'OrderReturns',
    timestamps: false // Set to true if you want Sequelize to manage createdAt and updatedAt
});

module.exports = OrderReturn; 