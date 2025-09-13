module.exports = (sequelize, DataTypes) => {
  const BookingTemp = sequelize.define("BookingTemp", {
    patientId: {          // ID của user
      type: DataTypes.INTEGER,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    timeType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true
    },
    statusId: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "S0" // S0 = pending, S1 = confirmed
    }
  });

  BookingTemp.associate = function (models) {
    // Nếu muốn, có thể thêm quan hệ:
    // BookingTemp.belongsTo(models.User, { foreignKey: 'patientId', targetKey: 'id', as: 'patient' });
    // BookingTemp.belongsTo(models.Doctor, { foreignKey: 'doctorId', targetKey: 'id', as: 'doctor' });
  };

  return BookingTemp;
};
