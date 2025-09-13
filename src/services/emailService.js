import nodemailer from "nodemailer";

// Tạo transporter từ .env
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_APP,
    pass: process.env.EMAIL_APP_PASSWORD
  }
});

/**
 * Gửi email thông báo đặt lịch
 * @param {string} to - email người nhận
 * @param {string} subject - tiêu đề email
 * @param {string} htmlContent - nội dung HTML
 */
export const sendEmail = async ({ to, subject, htmlContent }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Clinic" <${process.env.EMAIL_APP}>`,
      to,
      subject,
      html: htmlContent
    });
    console.log("Email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

/**
 */
export const generateBookingEmail = ({ patientName, doctorName, date, time }) => {
  return `
    <h3>Booking Confirmation / Xác nhận đặt lịch</h3>
    <p>Dear ${patientName},</p>
    <p>Your appointment with <b>${doctorName}</b> has been confirmed.</p>
    <p>Date: ${date} / Thời gian: ${time}</p>
    <p>Cảm ơn bạn đã chọn phòng khám của chúng tôi!</p>
  `;
};
