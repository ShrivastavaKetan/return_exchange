const { Model, DataTypes } = require('sequelize'); // Ensure Model is imported

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.UserRole, { foreignKey: 'role_id' });
      User.hasMany(models.Order, { foreignKey: 'user_id' });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      role_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(191),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(191),
        allowNull: true,
        unique: true,  // Enforces uniqueness of email
      },
      email_verify_token: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      is_email: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_phone: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
        unique: true,  // Enforces uniqueness of phone number
      },
      otp: {
        type: DataTypes.STRING(6),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(191),
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
      },
      referral_code: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      phone_verified_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      email_verified_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      remember_token: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      reset_token: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      reset_token_expiry: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  // Define relationships
  User.associate = (models) => {
    // Define association with UserRoles
    User.belongsTo(models.UserRole, { foreignKey: 'role_id', as: 'role' });
  };

  return User;
};
