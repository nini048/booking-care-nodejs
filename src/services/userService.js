import { where } from "sequelize";
import db from "../models/index.js";
import bcrypt from 'bcryptjs';

export const handleUserLogin = async (email, password) => {
  const { isExist, user } = await checkUserEmail(email);

  if (!isExist) {
    return {
      errorCode: 2,
      message: 'The email you entered does not exist / Email bạn nhập không tồn tại'
    };
  }

  const isMatchPassword = await compareUserPassword(user, password);

  if (!isMatchPassword) {
    return {
      errorCode: 3,
      message: 'The password you entered is incorrect / Mật khẩu bạn nhập không đúng'
    };
  }

  return {
    errorCode: 0,
    message: 'Login successful / Đăng nhập thành công',
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
    attributes: ['email', 'roleId', 'firstName', 'lastName']
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

        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender,
        roleId: data.role,
        positionId: data.position,
        image: data.image


      },
        {
          where: { id: userId }
        }
      )

      if (update === 0) {
        resolve({
          errorCode: 2,
          message: 'Update failed / Cập nhật thất bại'
        })
      }
      resolve({
        errorCode: 0,
        message: 'Update successful / Cập nhật thành công',
      })
    }
    catch (e) {

      console.error("ERROR editUser:", e.message || e);
      resolve({
        errorCode: 3,
        message: 'Update failed / Cập nhật thất bại'
      })
    }
  })
}
export const createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.password || !data.firstName || !data.lastName || !data.image || !data.address) {
        return resolve({
          errorCode: '3',
          message: "Please enter all required information / Vui lòng nhập đầy đủ thông tin bắt buộc"
        })
      }
      let check = await checkUserEmail(data.email)
      if (check.isExist) {

        return resolve({
          errorCode: 1,
          message: 'Email is already in use / Email đã được sử dụng'
        });
      }
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender,
        roleId: data.role,
        positionId: data.position,
        image: data.image


      });

      return resolve({
        errorCode: 0,
        message: 'Create user successful / Tạo người dùng thành công',
        users: {
          id: data.id,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address
        }
      });
    } catch (e) {
      console.log(">>>>error: ", e);
      resolve({
        errorCode: 4,
        message: 'Create user failed / Tạo người dùng thất bại',
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
          message: 'User does not exist / Người dùng không tồn tại'
        })
      }
      resolve({
        errorCode: 0,
        message: 'Delete user successful / Xóa người dùng thành công'
      })
    } catch (e) {
      resolve({
        errorCode: 3,
        message: 'Delete user failed / Xóa người dùng thất bại'
      });
    }
  })
};
export const getAllCodeService = async (typeInput) => {
  try {
    if (!typeInput) {

      return {
        errorCode: 1,
        message: 'Missing parameter / Thiếu tham số',
      };
    }
    else {
      let allcode = await db.Allcode.findAll(
        { where: { type: typeInput } }

      );
      return {
        errorCode: 0,
        message: 'Fetch allcode successful / Lấy danh sách allcode thành công',
        data: allcode,
      };

    }
  } catch (e) {
    console.error("Allcode fetch error:", e.message);
    throw e;
  }
};
