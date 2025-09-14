import db from "../models";

export const postNewSpecialtyService = async (data) => {
  try {
    if (!data.name || !data.image || !data.contentHTML || !data.contentMarkdown) {
      return {

        errorCode: 1,
        message: 'Missing parameter / Thiếu tham số'
      }
    }
    else {
      await db.Specialty.create({
        name: data.name,
        image: data.image,
        contentHTML: data.contentHTML,
        contentMarkdown: data.contentMarkdown
      })
      return {
        errorCode: 0,
        message: 'Create specialty successfully / Lưu thông tin chuyên khoa thành công'
      }
    }
  }
  catch (e) {

    console.error("ERROR postNewSpecialtyService:", e.message || e);
    return {
      errorCode: -1,
      message: 'Database error / Lỗi từ DB'
    };
  }
}
export const getAllSpecialtyService = async () => {
  try {
    let specialties = await db.Specialty.findAll()
    return {
      errorCode: 0,
      message: "Get specialty information successfully / Lấy thông tin chuyên khoa thành công",
      data: specialties
    }
  }
  catch (e) {

    console.error("ERROR getAllSpecialtyService:", e.message || e);
    return {
      errorCode: -1,
      message: 'Database error / Lỗi từ DB'
    };
  }
}
