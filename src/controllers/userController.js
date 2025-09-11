// import userService from '../services/userService'
import { where } from 'sequelize';
import {
  handleUserLogin, getAllUsers, createNewUser,
  deleteUser, editUser, getAllCodeService
} from '../services/userService';


let handleLogin = async (req, res) => {

  const { email, password } = req.body;
  console.log('>>>email: ', email)
  console.log('>>>password: ', password)
  if (!email || !password) {
    return res.status(502).json({
      errorCode: 3,
      message: 'Email and password are required / Bắt buộc phải nhập email và mật khẩu'
    })
  }
  let userData = await handleUserLogin(email, password)
  return res.status(202).json({
    errorCode: userData.errorCode,
    message: userData.message,
    user: userData.user ? userData.user : {}
  })

}
let handleGetAllUsers = async (req, res) => {
  let id = req.query?.id
  // return res.status(200).json({
  //   message: 'ok',
  //   res: res.body
  // })
  if (!id) {

    return res.status(200).json({
      errorCode: 1,
      message: 'Missing required parameter (id) / Thiếu tham số bắt buộc (id)',
      users: []
    })
  }

  let users = await getAllUsers(id)
  return res.status(200).json({
    errorCode: 0,
    message: 'Fetch users successfully / Lấy danh sách người dùng thành công',
    users
  })

}
let handleCreateNewUser = async (req, res) => {
  try {
    let data = req.body;
    if (req.file) {
      data.image = req.file.filename; // hoặc req.file.path nếu muốn lưu path
    }
    let message = await createNewUser(data);
    return res.status(200).json(message);
  } catch (e) {
    return res.status(500).json({
      errorCode: 99,
      message: 'Server error / Lỗi từ máy chủ'
    });
  }
};
let handleEditUser = async (req, res) => {
  let id = req.params?.id
  let data = req?.body
  if (!id) {
    return res.status(200).json({
      errorCode: 1,
      message: 'Missing parameter (id) / Thiếu tham số (id)'
    })
  }

  let message = await editUser(id, data)
  return res.status(201).json(message)
}
let handleDeleteUser = async (req, res) => {
  let id = req.params?.id
  if (!id) {
    return res.status(201).json({
      errorCode: 2,
      message: 'Missing parameter (id) / Thiếu tham số (id)'
    })
  }
  let message = await deleteUser(id)
  return res.status(201).json(message)
}
let getAllCode = async (req, res) => {
  try {
    setTimeout(async () => {

      let data = await getAllCodeService(req.query.type);
      return res.status(200).json(data);
    }, 2000)
  }
  catch (e) {
    return res.status(200).json({
      errorCode: -1,
      message: 'Error from server / Lỗi từ máy chủ'
    })
  }
}
module.exports = {
  handleLogin, handleGetAllUsers, handleCreateNewUser,
  handleEditUser, handleDeleteUser, getAllCode
}
