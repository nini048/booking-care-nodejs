"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Specialty extends Model {
    static associate(models) {
      // define association here
      Specialty.hasMany(models.DoctorInfo, { foreignKey: 'specialtyId', as: 'specialtyData' });

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
