const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userSchema = new Schema({
  userName: { type: String, required: true, unique: true }, // mongoose create unique index in mongodb
  password: { type: String, required: true },
  token: { type: String },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.TOKEN_KEY, {
    expiresIn: "120s",
  });
  user.token = token;
  await user.save();
  return user;
};

const User = model("User", userSchema);

module.exports = User;
