const { Schema, model } = require("mongoose");
const Joi = require("joi");
const studentSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      validate: [
        {
          validator: (email) => {
            // regex
            // Joi, yup, validator.js express-validator
            return Joi.string().email().validate(email).error === undefined;
          },
          // return false -> invalid -> return error msg
          msg: "Invalid email format",
        },
      ],
    },
    courses: [
      {
        type: String,
        ref: "Course",
      },
    ],
  },
  {
    timestamps: true, //can add created and updated tiem to each document
  }
);
const Student = model("Student", studentSchema);
//create model in db and also a collection named students in db
module.exports = Student;
