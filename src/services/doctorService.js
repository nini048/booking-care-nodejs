import { where } from "sequelize";
import db from "../models/index.js";
import { Op } from "sequelize";

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
    // Kiểm tra các tham số bắt buộc
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

    // --- Xử lý Markdown ---
    let doctorMarkdown = await db.Markdown.findOne({
      where: { doctorId: inputData.doctorId },
      raw: false
    });

    if (doctorMarkdown) {
      // Update nếu đã có
      doctorMarkdown.contentHTML = inputData.contentHTML;
      doctorMarkdown.contentMarkdown = inputData.contentMarkdown;
      doctorMarkdown.description = inputData.description;
      await doctorMarkdown.save();
    } else {
      // Tạo mới
      await db.Markdown.create({
        contentHTML: inputData.contentHTML,
        contentMarkdown: inputData.contentMarkdown,
        description: inputData.description,
        doctorId: inputData.doctorId
      });
    }

    // --- Xử lý Doctor_Info ---
    let doctorInfo = await db.Doctor_Info.findOne({
      where: { doctorId: inputData.doctorId },
      raw: false
    });

    if (doctorInfo) {
      // Update nếu đã có
      doctorInfo.priceId = inputData.priceId;
      doctorInfo.provinceId = inputData.provinceId;
      doctorInfo.paymentId = inputData.paymentId;
      doctorInfo.addressClinic = inputData.addressClinic;
      doctorInfo.nameClinic = inputData.nameClinic;
      doctorInfo.note = inputData.note;
      doctorInfo.count = inputData.count || doctorInfo.count; // giữ count cũ nếu chưa có
      await doctorInfo.save();
    } else {
      // Tạo mới
      await db.Doctor_Info.create({
        doctorId: inputData.doctorId,
        priceId: inputData.priceId,
        provinceId: inputData.provinceId,
        paymentId: inputData.paymentId,
        addressClinic: inputData.addressClinic,
        nameClinic: inputData.nameClinic,
        note: inputData.note,
        count: inputData.count || 0
      });
    }

    return {
      errorCode: 0,
      message: 'Doctor info saved successfully / Lưu thông tin bác sĩ thành công'
    };
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
        {
          model: db.Doctor_Info,        // Thêm bảng doctor_info
          as: 'doctorInfo',
          attributes: [
            'priceId',
            'paymentId',
            'provinceId',
            'addressClinic',
            'nameClinic',
            'note',
            'count',
            'createdAt',
            'updatedAt'
          ]
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
export const bulkCreateScheduleService = async (data) => {
  try {
    const { doctorId, date, time, maxNumber } = data;

    if (!doctorId || !date || !time || !Array.isArray(time) || !maxNumber) {
      return {
        errorCode: 1,
        message: "Invalid input / Dữ liệu không hợp lệ",
      };
    }

    // Lấy tất cả lịch của bác sĩ trong ngày
    const existing = await db.Schedule.findAll({
      where: {
        doctorId,
        date,
      },
      raw: true,
    });

    const existingTimeTypes = existing.map((item) => item.timeType);

    // Tạo danh sách lịch mới, bỏ các khung giờ đã tồn tại
    const newSchedules = time
      .filter((t) => !existingTimeTypes.includes(t))
      .map((timeType, index) => ({
        doctorId,
        date,
        timeType,
        currentNumber: existing.length + index + 1, // số thứ tự trong ngày
        maxNumber,
      }));

    if (newSchedules.length === 0) {
      return {
        errorCode: 2,
        message: "All schedules already exist / Lịch đã tồn tại hết",
        existingTimeTypes,
      };
    }

    await db.Schedule.bulkCreate(newSchedules);

    return {
      errorCode: 0,
      message: "Schedules created successfully / Tạo lịch thành công",
    };
  } catch (e) {
    console.error("ERROR bulkCreateScheduleService:", e.message || e);
    return {
      errorCode: -1,
      message: "Database error / Lỗi từ DB",
    };
  }
};
export const getScheduleByDateService = async (doctorId, date) => {
  try {
    if (!doctorId || !date) return {
      errorCode: 1,
      message: 'Missing parameter / Thiếu tham số'
    }
    else {
      let dataSchedule = await db.Schedule.findAll({
        where: {
          doctorId: doctorId,
          date: date
        },
        include: [
          {
            model: db.Allcode,
            as: 'timeTypeData',
            attributes: ['valueEn', 'valueVi']
          }
        ],
        raw: false,
        nest: true
      });

      if (!dataSchedule || dataSchedule.length === 0) {
        dataSchedule = [];
      }
      return {
        errorCode: 0,
        message: 'Fetch schedule success',
        data: dataSchedule
      }

    }
  }
  catch (e) {

    console.error("ERROR getScheduleByDateService:", e.message || e);
    return {
      errorCode: -1,
      message: "Database error / Lỗi từ DB",
    };
  }
}
