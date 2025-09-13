import { postBookAppointmentService } from "../services/patientService"
import { sendEmail, generateBookingEmail } from "../services/emailService";
import crypto from "crypto";

export const postBookAppointment = async (req, res) => {
  try {
    let response = await postBookAppointmentService(req.body)
    if (response.errorCode === 0) {
      const { email, fullName, doctorId, date, timeType, doctorName } = req.body;
      const htmlContent = generateBookingEmail({
        patientName: fullName,
        doctorName: doctorName,
        date,
        time: timeType
      });

      await sendEmail({
        to: email,
        subject: "Booking Confirmation / Xác nhận đặt lịch",
        htmlContent
      });
    }
    return res.status(200).json(response)


  }
  catch (e) {
    console.log(e)
    return res.status(500).json({
      errorCode: -1,
      message: 'Server error / Lỗi từ máy chủ'
    })

  }
}
