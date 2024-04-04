"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cars.init(
    {
      name: DataTypes.STRING,
      photo: DataTypes.ARRAY(DataTypes.TEXT),

      price: DataTypes.NUMBER,
      size: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Cars",
    }
  );
  return Cars;
};
