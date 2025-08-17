// import userService from '../services/userService'
import { where } from 'sequelize';
import { handleUserLogin, getAllUsers, createNewUser, deleteUser, editUser } from '../services/userService';


let handleLogin = async (req, res) => {

  const { email, password } = req.body;
  console.log('>>>email: ', email)
  console.log('>>>password: ', password)
  if (!email || !password) {
    return res.status(502).json({
      errorCode: 3,
      message: 'Email and password are required'
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
      message: 'Missing required paremeter (id)',
      users: []
    })
  }

  let users = await getAllUsers(id)
  return res.status(200).json({
    errorCode: 0,
    message: 'fetch users successfully',
    users
  })

}
let handleCreateNewUser = async (req, res) => {
  let message = await createNewUser(req.body)
  return res.status(200).json(message)
}
let handleEditUser = async (req, res) => {
  let id = req.params?.id
  let data = req?.body
  if (!id) {
    return res.status(200).json({
      errorCode: 1,
      message: 'Missing parameter (id)'
    })
  }

  let message = await editUser(id, data)
  return res.status(200).json(message)
}
let handleDeleteUser = async (req, res) => {
  let id = req.params?.id
  if (!id) {
    return res.status(200).json({
      errorCode: 1,
      message: 'Missing parameter (id)'
    })
  }
  let message = await deleteUser(id)
  return res.status(200).json(message)
}
module.exports = {
  handleLogin, handleGetAllUsers, handleCreateNewUser,
  handleEditUser, handleDeleteUser
}
