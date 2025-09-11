import { where } from "sequelize";
import db from "../models/index.js";

export const getTopDoctorHomeService = async (limitInput) => {
  try {
    let users = await db.User.findAll({
      limit: limitInput,
      where: { roleId: 'R2' },
      order: [['createdAt', 'DESC']],
      attributes: {
        exclude: ['password']
      },
      include: [
        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
        { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
      ],
      raw: true,
      nest: true
    });

    return {
      errorCode: 0,
      message: 'Fetch users successful',
      data: users
    };
  } catch (e) {
    console.error("ERROR getTopDoctorHomeService:", e.message || e)
    return {
      errorCode: -1,
      message: 'Database error / Lỗi từ DB'
    };
  }
}
