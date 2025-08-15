// import userService from '../services/userService'
import { handleUserLogin } from '../services/userService';


let handleLogin = async (req, res) => {

  const { email, password } = req.body;
  console.log('>>>email: ', email)
  console.log('>>>password: ', password)
  if (!email || !password) {
    return res.status(500).json({
      errorCode: 1,
      message: 'Email and password are required'
    })
  }
  let userData = await handleUserLogin(email, password)
  return res.status(200).json({
    errorCode: userData.errorCode,
    message: userData.message,
    user: userData.user ? userData.user : {}
  })

}
module.exports = { handleLogin }
