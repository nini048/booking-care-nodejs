import { postBookAppointmentService } from "../services/patientService"

export const postBookAppointment = async (req, res) => {
  try {
    let response = postBookAppointmentService(req.body)
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
