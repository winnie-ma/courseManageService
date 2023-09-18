const { Schema, model } = require("mongoose");
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
    },
  },
  {
    timestamps: true, //can add created and updated tiem to each document
  }
);
const Student = model("Student", studentSchema);
//create model in db and also a collection named students in db
module.exports = Student;
