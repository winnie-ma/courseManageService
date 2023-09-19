const Course = require("../models/course.model");
const mongoose = require("mongoose");
const addCourse = async (req, res) => {
  // try {

  // } catch (error) {

  // }
  const { name, description } = req.body;
  const _id = new mongoose.Types.ObjectId().toString();
  const course = new Course({ _id, name, description });
  await course.save();
  res.json(course);
};
const getAllCourses = async (req, res) => {
  const courses = await Course.find().exec();
  res.json(courses);
};
const getCourseById = async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id).exec();
  if (!course) {
    res.status(404).json({ message: "Course not found" });
    return;
  }
  res.json(course);
};
const updateCourseById = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const course = await Course.findByIdAndUpdate(
    id,
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
  const { id } = req.params;
  const course = await Course.findByIdAndDelete(id).exec();
  if (!course) {
    res.status(404).json({ message: "Course not found" });
    return;
  }
  res.sendStatus(204);
};

module.exports = {
  getAllCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
  addCourse,
};
