import db from "../models/index.js";
import bcrypt from 'bcryptjs';
let handleUserLogin = (email, password) => {

  return new Promise(async (resolve, reject) => {
    try {

      let userData = {}
      let { isExist, user } = await checkUserEmail(email)
      if (isExist) {
        let isMatchPassword = await compareUserPassword(user, password)
        if (isMatchPassword) {
          userData.errorCode = 0
          userData.message = 'Login successful'
          userData.user = user
          resolve(userData)

        }
        else {
          userData.errorCode = 3
          userData.message = 'The password you entered is incorrect'
          resolve(userData)
        }
      }
      else {
        userData.errorCode = 2
        userData.message = 'The email you entered does not exist'
        resolve(userData)
      }
    }
    catch (e) {
      reject(e)
    }
  })
}
let compareUserPassword = (user, passwordInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userWithPassword = await db.User.findOne({
        where: { email: user.email },
        attributes: ['password']
      });
      let match = await bcrypt.compare(passwordInput, userWithPassword.password)
      resolve((match))
    }
    catch (e) {
      reject(e)
    }
  })
}
let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {

      let user = await db.User.findOne({
        where: { email: userEmail },
        attributes: ['email', 'roleId']
      })
      if (user) {
        resolve({
          isExist: true,
          user: user
        })
      }
      else {
        resolve({
          isExist: false,
          user: user
        })
      }
    }
    catch (e) {
      reject(e)
    }
  })
}
module.exports = { handleUserLogin, checkUserEmail }
