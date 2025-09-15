import db from "../models"
import clinic from "../models/clinic"
export const postNewClinicService = async (data) => {

  try {
    if (!data.name || !data.image || !data.contentHTML || !data.contentMarkdown) {
      return {

        errorCode: 1,
        message: 'Missing parameter / Thiếu tham số'
      }
    }
    else {
      await db.Clinic.create({
        name: data.name,
        image: data.image,
        contentHTML: data.contentHTML,
        contentMarkdown: data.contentMarkdown,
        address: data.address
      })
      return {
        errorCode: 0,
        message: 'Create clinic successfully / Lưu thông tin phòng khám thành công'
      }
    }
  }
  catch (e) {

    console.error("ERROR postNewClinicService:", e.message || e);
    return {
      errorCode: -1,
      message: 'Database error / Lỗi từ DB'
    };
  }

}
export const getAllClinicService = async () => {
  try {
    let clinics = await db.Clinic.findAll()
    return {
      errorCode: 0,
      message: "Get clinics information successfully / Lấy thông tin phòng khám thành công",
      data: clinics
    }
  }
  catch (e) {

    console.error("ERROR getAllClinicService:", e.message || e);
    return {
      errorCode: -1,
      message: 'Database error / Lỗi từ DB'
    };
  }
}

export const getDoctorsByClinicService = async (clinicId) => {
  try {
    let doctors = await db.Clinic.findOne({
      where: { id: clinicId },
      include: [
        {
          model: db.DoctorInfo,
          as: "clinicData",
          include: [
            {
              model: db.User,
              as: "doctorData",
              attributes: ["id", "firstName", "lastName", 'image'],
              include: [
                {
                  model: db.Allcode,
                  as: "positionData",
                  attributes: ["valueEn", "valueVi"]
                },
                {
                  model: db.Markdown,
                  as: 'markdownData',
                  attributes: ['contentHTML', 'contentMarkdown', 'description']
                }

              ]
            },

          ],
        }
      ],
      raw: false,
      nest: true
    })
    return {
      errorCode: 0,
      message: "Get doctors of clinic successfully / Lấy thông tin bác sĩ của phòng khám thành công",
      data: doctors
    };
  }
  catch (e) {

    console.error("ERROR getDoctorsByClinicService:", e.message || e);
    return {
      errorCode: -1,
      message: 'Database error / Lỗi từ DB'
    };
  }
}

