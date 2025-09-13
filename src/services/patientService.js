import db from "../models";
export const postBookAppoinmentService = async (data) => {
  try {
    if (!data.email) {

      return {
        errorCode: 1,
        message: 'Missing parameter / Thiếu tham số'
      };
    }
    else {
      let user = await db.User.findOrCreate({
        where: { email: data.email },
        defaults: {
          email: data.email,
          roleId: 'R3'
        }
      });
      return {
        errorCode: 0,
        message: "Find or create user success / Tạo hoặc tìm người dùng thành công",
        data: user
      }

    }
  }
  catch (e) {

    console.error("ERROR postBookAppoinmentService:", e.message || e);
    return {
      errorCode: -1,
      message: 'Database error / Lỗi từ DB'
    };
  }
}
