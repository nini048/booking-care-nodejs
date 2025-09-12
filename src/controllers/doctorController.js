import {
  getAllDoctorsService, getTopDoctorHomeService,
  postInfoDoctorService,
  getInfoDoctorService
} from '../services/doctorService'
export const getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let response = await getTopDoctorHomeService(+limit)
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
export const getAllDoctors = async (req, res) => {
  try {
    let doctors = await getAllDoctorsService()
    return res.status(200).json(doctors)
  }
  catch (e) {
    console.log(e)
    return res.status(500).json({
      errorCode: -1,
      message: 'Server error / Lỗi từ máy chủ'
    })
  }
}
export const postInfoDoctor = async (req, res) => {
  try {
    let response = await postInfoDoctorService(req.body)
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
export const getInfoDoctor = async (req, res) => {
  try {

    if (!req.query.id) {
      return res.status(400).json({
        errCode: 3,
        errMessage: 'Missing req query.id / Thiếu tham số id'
      });
    }
    let response = await getInfoDoctorService(req.query.id)
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
