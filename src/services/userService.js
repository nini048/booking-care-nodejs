import { where } from "sequelize";
import db from "../models/index.js";
import bcrypt from 'bcryptjs';

export const handleUserLogin = async (email, password) => {
  const { isExist, user } = await checkUserEmail(email);

  if (!isExist) {
    return {
      errorCode: 2,
      message: 'The email you entered does not exist'
    };
  }

  const isMatchPassword = await compareUserPassword(user, password);

  if (!isMatchPassword) {
    return {
      errorCode: 3,
      message: 'The password you entered is incorrect'
    };
  }

  return {
    errorCode: 0,
    message: 'Login successful',
    user
  };
};

const compareUserPassword = async (user, passwordInput) => {
  const userWithPassword = await db.User.findOne({
    where: { email: user.email },
    attributes: ['password']
  });

  return await bcrypt.compare(passwordInput, userWithPassword.password);
};

const checkUserEmail = async (userEmail) => {
  const user = await db.User.findOne({
    where: { email: userEmail },
    attributes: ['email', 'roleId']
  });

  return {
    isExist: !!user,
    user
  };
};
const saltRounds = 10;
let hashUserPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  } catch (e) {
    throw e;
  }
};


export const getAllUsers = async (userId) => {
  let users = '';
  if (userId === 'ALL') {
    users = await db.User.findAll({
      attributes: { exclude: ['password'] },
      raw: true

    })
  }
  else if (userId) {
    users = await db.User.findOne({
      where: {
        id: userId
      },
      attributes: { exclude: ['password'] },
      raw: true
    })
  }
  return users
}
export const editUser = async (userId, data) => {
  return new Promise(async (resolve, reject) => {

    try {

      let [update] = await db.User.update({

        firstName: data.firstname,
        lastName: data.lastname,
        address: data.address,
        phoneNumber: data.phonenumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.role,

      },
        {
          where: { id: userId }
        }
      )

      if (update === 0) {
        resolve({
          errorCode: 2,
          message: 'update fail'
        })
      }
      resolve({
        errorCode: 0,
        message: 'update successful'
      })
    }
    catch (e) {

      resolve({
        errorCode: 3,
        message: 'update fail'
      })
    }
  })
}
export const createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email)
      if (check) {

        resolve({
          errorCode: 1,
          message: 'Email is used'
        });
      }
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstname,
        lastName: data.lastname,
        address: data.address,
        phoneNumber: data.phonenumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.role,
      });
      resolve({
        errorCode: 0,
        message: 'Create user successful'
      });
    } catch (e) {
      console.log(">>>>error: ", e);
      resolve({
        errorCode: 3,
        message: "create user fail"
      })
    }
  });
};
export const deleteUser = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {

      let deleted = await db.User.destroy({
        where: { id: userId }
      })
      if (!deleted) {
        resolve({
          errorCode: 2,
          message: 'Delete not exist'
        })
      }
      resolve({
        errorCode: 0,
        message: 'Delete user successful'
      })
    } catch (e) {
      resolve({
        errorCode: 3,
        message: 'Delete user failed',
        error: e.message
      });
    }
  })
}
