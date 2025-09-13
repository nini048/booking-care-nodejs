import crypto from 'crypto';
import db from '../models';
import { sendEmail } from './emailService'; // service bạn đã có

export const postBookAppointmentService = async (data) => {
  try {
    if (!data.email || !data.doctorId || !data.date || !data.timeType) {
      return { errorCode: 1, message: 'Missing parameter / Thiếu tham số' };
    }

    // 1. Tạo user nếu chưa có
    let [user] = await db.User.findOrCreate({
      where: { email: data.email },
      defaults: { email: data.email, roleId: 'R3' }
    });

    // 2. Tạo token xác nhận
    const token = crypto.randomBytes(20).toString('hex');

    // 3. Lưu booking tạm với trạng thái pending
    await db.Booking.findOrCreate({
      where: { patientId: user.id, date: data.date, timeType: data.timeType },
      defaults: {
        statusId: 'S0', // pending
        doctorId: data.doctorId,
        patientId: user.id,
        date: data.date,
        timeType: data.timeType,
        token: token
      }
    });

    // 4. Gửi email xác nhận
    const link = `${process.env.FRONTEND_URL}/confirm-booking?token=${token}`;
    await sendEmail({
      to: data.email,
      subject: 'Xác nhận lịch khám / Confirm your appointment',
      html: `
        <p>Xin chào / Hello,</p>
        <p>Click vào link để xác nhận lịch khám / Click this link to confirm your appointment:</p>
        <a href="${link}">${link}</a>
      `
    });

    return { errorCode: 0, message: 'Check your email to confirm / Vui lòng kiểm tra email để xác nhận' };

  } catch (e) {
    console.error(e);
    return { errorCode: -1, message: 'Database error / Lỗi từ DB' };
  }
};
export const saveBookingTempService = async (data) => {
  try {
    if (!data.email || !data.doctorId || !data.date || !data.timeType) {
      return {
        errorCode: 1,
        message: "Missing parameter / Thiếu tham số",
      };
    }

    // Lưu booking tạm (chưa xác nhận)
    const booking = await db.BookingTemp.create({
      email: data.email,
      doctorId: data.doctorId,
      date: data.date,
      timeType: data.timeType,
      token: data.token, // dùng để xác nhận
      statusId: 'S1',
      patientId: data.patientId
    });

    return {
      errorCode: 0,
      message: "Save booking temp success",
      booking,
    };
  } catch (e) {
    console.error("ERROR saveBookingTempService:", e.message || e);
    return {
      errorCode: -1,
      message: "Database error / Lỗi từ DB",
    };
  }
};
