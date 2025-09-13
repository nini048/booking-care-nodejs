import db from "../models";

import crypto from "crypto";
export const postBookAppointmentService = async (data) => {
  try {
    if (!data.email || !data.doctorId || !data.date || !data.timeType) {

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
      if (user && user[0]) {
        await db.Booking.findOrCreate({
          where: { patientId: user[0].id },
          defaults: {

            statusId: 'S1',
            doctorId: data.doctorId,
            patientId: user[0].id,
            date: data.date,
            timeType: data.timeType
          }
        })
      }
      return {
        errorCode: 0,
        message: "booking success",
        user: user,
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
