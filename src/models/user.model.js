const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userSchema = new Schema({
  userName: { type: String, required: true, unique: true }, // mongoose create unique index in mongodb
  password: { type: String, required: true },
});

userSchema.methods.hashPassword = async function () {
  this.password = await bcrypt.hash(this.password, 12);
};

userSchema.methods.validatePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
