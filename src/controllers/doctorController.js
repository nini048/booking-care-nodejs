import { getTopDoctorHomeService } from '../services/doctorService'
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
