import { getAllSpecialtyService, postNewSpecialtyService } from "../services/specialtyService";

export const postNewSpecialty = async (req, res) => {
  try {
    let data = req.body
    if (req.file) {
      data.image = req.file.filename
    }
    let response = await postNewSpecialtyService(data)
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
export const getAllSpecialty = async (req, res) => {
  try {
    let response = await getAllSpecialtyService();
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
