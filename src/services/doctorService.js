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
export const postInfoDoctorService = async (inputData) => {
  try {
    if (
      !inputData.doctorId ||
      !inputData.contentHTML ||
      !inputData.contentMarkdown ||
      !inputData.description
    ) {
      return {
        errorCode: 1,
        message: 'Missing parameter / Thiếu tham số'
      };
    }

    // Tìm xem đã có Markdown cho doctor chưa
    let doctorMarkdown = await db.Markdown.findOne({
      where: { doctorId: inputData.doctorId },
      raw: false
    });

    if (doctorMarkdown) {
      // Nếu đã có thì update
      doctorMarkdown.contentHTML = inputData.contentHTML;
      doctorMarkdown.contentMarkdown = inputData.contentMarkdown;
      doctorMarkdown.description = inputData.description;
      await doctorMarkdown.save();

      return {
        errorCode: 0,
        message: 'Update doctor info successful / Cập nhật thông tin bác sĩ thành công'
      };
    } else {
      // Nếu chưa có thì tạo mới
      await db.Markdown.create({
        contentHTML: inputData.contentHTML,
        contentMarkdown: inputData.contentMarkdown,
        description: inputData.description,
        doctorId: inputData.doctorId
      });

      return {
        errorCode: 0,
        message: 'Create doctor info successful / Tạo mới thông tin bác sĩ thành công'
      };
    }
  } catch (e) {
    console.error("ERROR postInfoDoctorService:", e.message || e);
    return {
      errorCode: -1,
      message: 'Database error / Lỗi từ DB'
    };
  }
};
export const getInfoDoctorService = async (inputId) => {
  try {
    if (!inputId) {
      return {
        errorCode: 1,
        message: 'Missing parameter / Thiếu tham số'
      };
    }

    let data = await db.User.findOne({
      where: { id: inputId },
      attributes: {
        exclude: ['password']
      },
      include: [
        {
          model: db.Markdown,
          as: 'markdownData',
          attributes: ['contentHTML', 'contentMarkdown', 'description']
        },
        {
          model: db.Allcode,
          as: 'positionData',
          attributes: ['valueEn', 'valueVi']
        },
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
