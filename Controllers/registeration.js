const User = require("../models/User");

const bcrypt = require("bcryptjs");

const hashPasswordBcrypt = async (password, saltRate) => {
  const salt = await bcrypt.genSalt(saltRate);

  const hashPassword = await bcrypt.hash(password, salt);

  return hashPassword;
};

const registerNewUser = async (userdata) => {
  const integerSalt = parseInt(process.env.SALTING_RATE, 10);

  const hashPassword = await hashPasswordBcrypt(userdata.password, integerSalt);

  const user = new User({
    name: userdata.name,
    email: userdata.email,
    password: hashPassword,
  });

  try {
    await user.save();
    return { message: "User is saved", statusCode: 200 };
  } catch (error) {
    return { message: error, statusCode: 400 };
  }
};

const hashedUserGen = async (userdata) => {
  const integerSalt = parseInt(process.env.SALTING_RATE, 10);

  const hashPassword = await hashPasswordBcrypt(userdata.password, integerSalt);
  const user = {
    email: userdata.email,
    password: hashPassword,
  };

  return user;
};

module.exports = {
  registerNewUser: registerNewUser,
  hashedUserGen: hashedUserGen,
};
