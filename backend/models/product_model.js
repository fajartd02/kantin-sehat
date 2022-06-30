'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'student_id', as: 'user' });
    }
  }
  Product.init({
    student_id: {
      type:DataTypes.STRING,
      allowNull: false
    },
    product_name: {
      type:DataTypes.STRING,
      allowNull: false
    },
    product_image: {
      type:DataTypes.STRING,
      allowNull: true
    },
    description: {
      type:DataTypes.STRING,
      allowNull: true
    },
    price: {
      type:DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};