const Teacher = require("../models/teacher.model");
const Course = require("../models/course.model");
const NotFoundException = require("../exceptions/NotFoundException");
const Joi = require("joi");
const schema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().optional(),
});

const addTeacher = async (req, res) => {
  const validBody = await schema.validateAsync(req.body, {
    allowUnknown: true,
    stripUnknown: true,
  });
  //data validation
  const teacher = new Teacher(validBody);
  await teacher.save();
  res.json(teacher);
};

const getAllTeachers = async (req, res) => {
  const teachers = await Teacher.find().exec();
  res.json(teachers);
};

const getTeacherById = async (req, res) => {
  const { id } = req.params;
  const teacher = await Teacher.findById(id).exec();
  if (!teacher) {
    throw new NotFoundException("Teacher not found");
  }
  res.json(teacher);
};

const updateTeacherById = async (req, res) => {
  const { teacherId } = req.params;
  const validBody = await schema.validateAsync(req.body, {
    allowUnknown: true,
    stripUnknown: true,
  });
  //findByIdAndUpdate automatically check input data
  //if there is an undefined, this field won't be updated
  const teacher = await Teacher.findByIdAndUpdate(teacherId, validBody, {
    new: true,
  }).exec();
  if (!teacher) {
    throw new NotFoundException("Teacher not found");
  }
  res.json(teacher);
};

const deleteTeacherById = async (req, res) => {
  const { teacherId } = req.params;
  const teacher = await Teacher.findByIdAndDelete(teacherId).exec();
  if (!teacher) {
    throw new NotFoundException("Teacher not found");
  }
  await Course.updateMany(
    { teacher: teacher._id },
    { $pull: { teacher: teacher._id } }
  ).exec();
  res.sendStatus(204);
};

// /v1/teachers/:teacherId/courses/:courseId
const addTeacherToCourse = async (req, res) => {
  const { teacherId, courseId } = req.params;
  const teacher = await Teacher.findById(teacherId).exec();
  const course = await Course.findById(courseId).exec();
  if (!teacher || !course) {
    throw new NotFoundException("Teacher or course not found");
  }

  teacher.courses.addToSet(courseId);
  course.teachers.addToSet(teacherId);

  await teacher.save();
  await course.save();

  res.json(teacher);
};

// /v1/teachers/:teacherId/courses/:courseId
const removeTeacherFromCourse = async (req, res) => {
  const { teacherId, courseId } = req.params;
  const teacher = await Teacher.findById(teacherId).exec();
  const course = await Course.findById(courseId).exec();
  if (!teacher || !course) {
    throw new NotFoundException("Teacher or course not found");
  }

  await Teacher.findByIdAndUpdate(teacherId, {
    $pull: { courses: courseId },
  }).exec();
  await Course.findByIdAndUpdate(courseId, {
    $pull: { teachers: teacherId },
  }).exec();

  res.sendStatus(204);
};

module.exports = {
  getAllTeachers,
  getTeacherById,
  addTeacher,
  updateTeacherById,
  deleteTeacherById,
  addTeacherToCourse,
  removeTeacherFromCourse,
};
