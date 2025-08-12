import bcrypt from "bcryptjs";
import db from "../models/index";
const saltRounds = 10;
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
let hashUserPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  } catch (e) {
    throw e;
  }
};
module.exports = { createNewUser };
