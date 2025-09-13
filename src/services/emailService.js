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
export const generateBookingEmail = ({ patientName, doctorName, date, time, confirmUrl }) => {
  return `
    <h3>Xin chào ${patientName} / Hello ${patientName}</h3>
    <p>Bạn đã đặt lịch khám với bác sĩ <strong>${doctorName}</strong>.</p>
    <p>Thời gian: <strong>${date} ${time}</strong></p>
    <p>Vui lòng nhấn vào link dưới đây để xác nhận / Please click the link to confirm:</p>
    <a href="${confirmUrl}">${confirmUrl}</a>
    <p>Nếu bạn không đặt lịch, hãy bỏ qua email này / Ignore this email if you did not make this booking.</p>
  `;
};
