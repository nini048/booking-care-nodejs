"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Specialty extends Model {
    static associate(models) {
      // define association here
    }
  }
  Specialty.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      contentHTML: DataTypes.TEXT("long"),
      contentMarkdown: DataTypes.TEXT("long"),
    },
    {
      sequelize,
      modelName: "Specialty",
      tableName: "Specialty"
    }
  );
  return Specialty;
};
