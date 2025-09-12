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
      message: 'Fetch users successful / Lấy danh sách bác sĩ thành công',
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
export const getAllDoctorsService = async () => {
  try {
    let doctors = await db.User.findAll({
      where: { roleId: 'R2' },
      attributes: {
        exclude: ['password', 'image']
      },

    })
    return {
      errorCode: 0,
      message: 'Fetch doctor success / Lấy thông tin bác sĩ thành công', message: 'Fectch doctor success',
      data: doctors
    }

  }
  catch (e) {
    console.error("ERROR getTopDoctorHomeService:", e.message || e)
    return {
      errorCode: -1,
      message: 'Database error / Lỗi từ DB'
    };
  }

}
export const postInfoDoctorsService = async (inputData) => {
  try {

    if (
      !inputData.id ||
      !inputData.contentHTML ||
      !inputData.contentMarkdown
    ) {
      return {
        errorCode: 1,
        message: 'Missing parameter / Thiếu tham số'
      };
    }
    else {
      await db.Markdown.create({
        contentHTML: inputData.contentHTML,
        contentMarkdown: inputData.contentMarkdown,
        description: inputData.description,
        doctorId: inputData.doctorId
      });
      return {
        errorCode: 0,
        message: 'Save doctor info successful / Lưu thông tin bác sĩ thành công'
      }

    }
  }
  catch (e) {

    console.error("ERROR postInfoDoctorsService:", e.message || e)
    return {
      errorCode: -1,
      message: 'Database error / Lỗi từ DB'
    };
  }
}
export const getInfoDoctorService = async (id) => {
  try {
    if (!id) {
      return {
        errorCode: 1,
        message: 'Missing parameter / Thiếu tham số'
      };
    }

    // Lấy thông tin bác sĩ và Markdown liên quan
    let data = await db.User.findOne({
      where: { id },
      attributes: {
        exclude: ['password', 'image']
      },
      include: [
        {
          model: db.Markdown,
          as: 'doctorData', // phải trùng với association
          attributes: ['contentHTML', 'contentMarkdown', 'description'] // lấy description
        }
      ],
      raw: true,
      nest: true
    });

    return {
      errorCode: 0,
      message: 'Fetch info doctor success / Lấy thông tin bác sĩ thành công',
      data: data
    };
  } catch (e) {
    console.error("ERROR getInfoDoctorService:", e.message || e);
    return {
      errorCode: -1,
      message: 'Database error / Lỗi từ DB'
    };
  }
};
