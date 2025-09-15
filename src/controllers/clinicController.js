import db from '../models/index.js'
import { getAllClinicService, getDoctorsByClinicService, postNewClinicService } from '../services/clinicService.js'
export const postNewClinic = async (req, res) => {

  try {
    let data = req.body
    if (req.file) {
      data.image = req.file.filename
    }
    let response = await postNewClinicService(data)
    return res.status(200).json(response)
  }
  catch (e) {

    console.error(e);
    return res.status(500).json({
      errorCode: -1,
      message: 'Server error / Lỗi từ máy chủ',
    });
  }
}
export const getAllClinic = async (req, res) => {
  try {
    let response = await getAllClinicService()
    return res.status(200).json(response)
  }
  catch (e) {

    console.error(e);
    return res.status(500).json({
      errorCode: -1,
      message: 'Server error / Lỗi từ máy chủ',
    });
  }
}

export const getDoctorsByClinic = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(200).json({
        errCode: 3,
        errMessage: 'Missing req query.id / Thiếu tham số id'
      });
    }

    let response = await getDoctorsByClinicService(req.query.id)
    return res.status(200).json(response)
  }
  catch (e) {

    console.error(e);
    return res.status(500).json({
      errorCode: -1,
      message: 'Server error / Lỗi từ máy chủ',
    });
  }
}

