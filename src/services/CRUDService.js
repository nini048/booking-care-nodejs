import bcrypt from "bcryptjs";
import db from "../models/index";
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

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
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
      resolve("oke create new user success");
    } catch (e) {
      console.log(">>>>error: ", e);
    }
  });
};
let getAllUsers = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (e) {
      console.log(e);
    }
  });
};
let getUserInfoById = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (e) {
      reject(e);
    }
  });
};
let updateUserData = async(data) => {
  return new Promise (async (resolve, reject) =>{
    try{
      let user = await db.User.findOne({
        where: {id : data.id}
      })
      if (user) {

        user.firstname = data.firstname
        user.lastname = data.lastname
        user.address = data.address
        await user.save()
        let allUsers = db.User.findAll()
        resolve(allUsers)

      }
    }
    catch (e) {
      reject(e)
    }
  })
}
let deleteUserById = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.User.destroy({
        where: { id: userId }
      })
      resolve(); 
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = { createNewUser, getAllUsers, getUserInfoById, updateUserData, deleteUserById };
