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
