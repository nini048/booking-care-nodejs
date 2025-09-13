
import { sendEmail, generateBookingEmail } from "../services/emailService.js";

const handleBooking = async (req, res) => {
  const { email, fullName, doctorName, date, time } = req.body;

  // Lưu dữ liệu đặt lịch vào DB trước
  // ...

  // Gửi email xác nhận
  const htmlContent = generateBookingEmail({ patientName: fullName, doctorName, date, time });
  const emailSent = await sendEmail({ to: email, subject: "Appointment Confirmation", htmlContent });

  if (emailSent) {
    return res.status(200).json({ errorCode: 0, message: "Booking successful!" });
  } else {
    return res.status(500).json({ errorCode: 1, message: "Booking successful but failed to send email" });
  }
};
