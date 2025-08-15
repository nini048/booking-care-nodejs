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
