import db from "../models";
import { sendEmail, generateBookingEmail } from "../services/emailService";
import { v4 as uuidv4 } from "uuid";

// POST /api/book-appointment
export const postBookAppointment = async (req, res) => {
  try {
    const { email, fullName, doctorId, date, timeType, doctorName } = req.body;

    if (!email || !fullName || !doctorId || !date || !timeType) {
      return res.status(400).json({
        errorCode: 1,
        message: "Missing parameters / Thiếu tham số",
      });
    }

    // 1. Tạo user nếu chưa có
    const [user] = await db.User.findOrCreate({
      where: { email },
      defaults: { email, roleId: "R3", fullName },
    });

    // 2. Tạo token xác nhận
    const token = uuidv4();

    // 3. Lưu booking tạm với trạng thái pending
    const tempBooking = await db.BookingTemp.create({
      patientId: user.id,
      email,
      doctorId,
      date,
      timeType,
      token,
      statusId: "S0", // pending
    });

    // 4. Tạo link xác nhận
    const confirmUrl = `${process.env.FRONTEND_URL}/confirm-booking?token=${token}&doctorId=${doctorId}`;

    // 5. Tạo nội dung email
    const htmlContent = generateBookingEmail({
      patientName: fullName,
      doctorName,
      date,
      time: timeType,
      confirmUrl,
    });

    // 6. Gửi email xác nhận
    await sendEmail({
      to: email,
      subject: "Booking Confirmation / Xác nhận đặt lịch",
      htmlContent,
    });

    return res.status(200).json({
      errorCode: 0,
      message: "Please check your email to confirm booking / Vui lòng kiểm tra email để xác nhận đặt lịch",
    });

  } catch (e) {
    console.error("postBookAppointment error:", e);
    return res.status(500).json({
      errorCode: -1,
      message: "Server error / Lỗi từ máy chủ",
    });
  }
};

// GET /confirm-booking
export const confirmBooking = async (req, res) => {
  try {
    const { token } = req.query;

    // 1. Tìm booking tạm theo token
    const tempBooking = await db.BookingTemp.findOne({ where: { token } });

    if (!tempBooking) {
      return res.status(404).json({
        errorCode: 1,
        message: "Invalid token / Token không hợp lệ",
      });
    }

    // 2. Tạo booking chính trong bảng Booking nếu chưa có
    const [booking, created] = await db.Booking.findOrCreate({
      where: {
        doctorId: tempBooking.doctorId,
        patientId: tempBooking.patientId,
        date: tempBooking.date,
        timeType: tempBooking.timeType,
      },
      defaults: {
        statusId: "S1", // confirmed
      },
    });
    await db.Schedule.create({
      doctorId: tempBooking.doctorId,
      date: tempBooking.date,
      timeType: tempBooking.timeType,
    });
    // 3. Update booking tạm đã xác nhận
    await db.BookingTemp.update(
      { statusId: "S1", token: null },
      { where: { id: tempBooking.id } }
    );

    return res.status(200).json({
      errorCode: 0,
      message: "Booking confirmed / Đặt lịch thành công",
    });

  } catch (e) {
    console.error("confirmBooking error:", e);
    return res.status(500).json({
      errorCode: -1,
      message: "Server error / Lỗi máy chủ",
    });
  }
};
