const Course = require("../models/course.model");
const Student = require("../models/student.model");
const Joi = require("joi");
const addCourse = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    code: Joi.string()
      .uppercase()
      .regex(/^[a-zA-z]+[0-9]+$/)
      .message("Invalid code format, expecting something like COMP101")
      .required(),
  });
  const validBody = await schema.validateAsync(req.body, {
    allowUnknown: true,
    stripUnknown: true,
  });
  console.log(validBody);
  // console.log(req.body);
  // const { _id, name, description } = req.body;
  // const course = new Course({ _id, name, description });
  const course = new Course(validBody);
  await course.save();
  res.json(course);
};
const getAllCourses = async (req, res) => {
  const courses = await Course.find().exec();
  res.json(courses);
};
const getCourseById = async (req, res) => {
  const { courseId } = req.params;
  const course = await Course.findById(courseId)
    .populate("students", "firstName lastName email")
    .exec();
  if (!course) {
    res.status(404).json({ message: "Course not found" });
    return;
  }
  res.json(course);
};
const updateCourseById = async (req, res) => {
  const { courseId } = req.params;
  const schema = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
  });
  const { name, description } = await schema.validateAsync(req.body, {
    allowUnknown: true,
    stripUnknown: true,
  });
  const course = await Course.findByIdAndUpdate(
    courseId,
    { name, description },
    { new: true }
  ).exec();
  if (!course) {
    res.status(404).json({ message: "Course not found" });
    return;
  }
  res.json(course);
};
const deleteCourseById = async (req, res) => {
  const { courseId } = req.params;
  const course = await Course.findByIdAndDelete(courseId).exec();
  if (!course) {
    res.status(404).json({ message: "Course not found" });
    return;
  }
  await Student.updateMany(
    { courses: courseId },
    { $pull: { courses: courseId } }
  );
  res.sendStatus(204);
};

module.exports = {
  getAllCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
  addCourse,
};
