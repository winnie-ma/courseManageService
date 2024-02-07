const Joi = require("joi");
const User = require("../models/user.model");
const { generateAuthToken } = require("../utils/jwt");
async function userSchemaValidation(req) {
  const schema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required(),
  });
  const validBody = await schema.validateAsync(req.body, {
    allowUnknown: true,
    stripUnknown: true,
  });
  return validBody;
}

const register = async (req, res) => {
  const validBody = await userSchemaValidation(req);
  //for duplicate useName here, have two methods, first is to find if duplicate and deal with it before save as below, another is not deal with it here, since user model add unique index, if save duplicate, it will err and can deal with it in error middleware
  const existUser = await User.findOne({ userName: validBody.userName }).exec();
  if (existUser) {
    res.status(409).json({ error: "Duplicate username" });
    return;
  }
  const user = new User(validBody);
  await user.hashPassword();
  await user.save();
  const token = generateAuthToken({ _id: user._id, userName: user.userName });
  res.status(201).json({ token });
};

const login = async (req, res) => {
  const validBody = await userSchemaValidation(req);
  const user = await User.findOne({ userName: validBody.userName }).exec();
  if (!user) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }
  const isMatch = await user.validatePassword(validBody.password);
  if (!isMatch) {
    res.status(401).json({ error: "Invalid password" });
    return;
  }
  const token = generateAuthToken({
    _id: user._id,
    userName: user.userName,
    role: "admin",
  });

  res.json({
    token,
  });
};

module.exports = {
  register,
  login,
};
