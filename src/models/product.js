const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.User, { foreignKey: 'user_id' });
      Product.hasMany(models.OrderExchange, { foreignKey: 'product_id' });
      Product.hasMany(models.OrderReturn, { foreignKey: 'product_id' });
    }
  }

  Product.init(
    {
      product_name: { type: DataTypes.STRING, allowNull: false },
      brand_id: { type: DataTypes.INTEGER, allowNull: true },
      packed_weight: { type: DataTypes.DECIMAL(10, 2) },
      package_length: { type: DataTypes.DECIMAL(10, 2) },
      package_breadth: { type: DataTypes.DECIMAL(10, 2) },
      package_height: { type: DataTypes.DECIMAL(10, 2) },
      volumetric_weight: { type: DataTypes.DECIMAL(10, 2) },
      is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
      is_customizable_product: { type: DataTypes.BOOLEAN, defaultValue: false },
      delivery_by: { type: DataTypes.INTEGER, defaultValue: 1 },
      return_policy_id: { type: DataTypes.INTEGER, allowNull: true },
      exchange_policy_id: { type: DataTypes.INTEGER, allowNull: true },
      hsn_code_id: { type: DataTypes.INTEGER, allowNull: true },
      gst: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
      tag_price: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
      iz_commission: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
      no_return_discount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.00 },
      insurance_premium: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.00 },
      variant_type: { type: DataTypes.INTEGER, defaultValue: 0 },
      minimum_purchase_quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
      low_stock_quantity_warning: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
      sequelize,
      modelName: 'Product',
      tableName: 'products',
      timestamps: true,
      createdAt: 'created_on',
      updatedAt: 'updated_on',
    }
  );

  return Product;
};
