const Joi = require("joi");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
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
  await user.save();
  res.status(201).json(user);
};

const login = async (req, res) => {
  const validBody = await userSchemaValidation(req);
  const user = await User.findOne({ userName: validBody.userName }).exec();
  if (!user) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }
  const isMatch = await bcrypt.compare(validBody.password, user.password);
  if (!isMatch) {
    res.status(401).json({ error: "Invalid password" });
    return;
  }
  const authUser = await user.generateAuthToken();
  res.json(authUser);
};

module.exports = {
  register,
  login,
};
