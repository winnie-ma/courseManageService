const Student = require("../models/student.model");
const Course = require("../models/course.model");
const Joi = require("joi");

const addStudent = async (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().optional(),
  });
  const validBody = await schema.validateAsync(req.body, {
    allowUnknown: true,
    stripUnknown: true,
  });
  const student = new Student(validBody);
  //save will transfer student from mongoose doc to db doc
  await student.save();
  res.json(student);
};

const getAllStudents = async (req, res) => {
  const students = await Student.find().exec(); //db.students.find()
  res.json(students);
};

const getStudentById = async (req, res) => {
  const { studentId } = req.params;
  const student = await Student.findById(studentId).exec();
  if (!student) {
    // throw new NotFoundException("Student not found"); use this has similar same as below
    //but here use below will not go to error middleware
    res.status(404).json({ error: "Student not found" });
    return;
  }
  res.json(student);
};

const updateStudentById = async (req, res) => {
  const { studentId } = req.params;
  const schema = Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    email: Joi.string().email().optional(),
  });
  const validBody = await schema.validateAsync(req.body, {
    allowUnknown: true,
    stripUnknown: true,
  });
  const student = await Student.findByIdAndUpdate(studentId, validBody, {
    new: true,
  }).exec();
  if (!student) {
    res.status(404).json({ error: "Student not found" });
    return;
  }
  res.json(student);
};

const deleteStudentById = async (req, res) => {
  const { studentId } = req.params;
  const student = await Student.findByIdAndDelete(studentId).exec();
  if (!student) {
    res.status(404).json({ error: "Student not found" });
    return;
  }
  //also update the records in course
  await Course.updateMany(
    { students: student._id },
    { $pull: { courses: student._id } }
  ).exec();
  res.sendStatus(204);
};

//POST /v1/students/:studentId/courses/:courseId
const addStudentToCourse = async (req, res) => {
  const { studentId, courseId } = req.params;
  const student = await Student.findById(studentId).exec();
  const course = await Course.findById(courseId).exec();
  if (!student || !course) {
    res.status(404).json({
      error: "Student or course not found",
    });
    return;
  }
  //set make sure the unique
  course.students.addToSet(studentId);
  student.courses.addToSet(courseId);
  await student.save();
  await course.save();
  res.json(student);
};

const removeStudentFromCourse = async (req, res) => {
  const { studentId, courseId } = req.params;
  const student = await Student.findById(studentId).exec();
  const course = await Course.findById(courseId).exec();
  const isStudent = course.students.includes(studentId);
  const isCourse = student.courses.includes(courseId);
  if (!student || !course) {
    res.status(404).json({
      error: "Student or course not found",
    });
    return;
  }
  if (!isStudent || !isCourse) {
    res.status(404).json({
      error: "Student already deleted from this course",
    });
    return;
  }
  student.courses.pull(courseId);
  course.students.pull(studentId);
  await student.save();
  await course.save();
  res.sendStatus(204);
};

module.exports = {
  addStudent,
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  addStudentToCourse,
  removeStudentFromCourse,
};
