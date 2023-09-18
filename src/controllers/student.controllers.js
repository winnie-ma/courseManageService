const Student = require("../models/student.model");
const addStudent = async (req, res) => {
  const { firstName, lastName, email } = req.body;
  //data validation
  const student = new Student({ firstName, lastName, email });
  //save will transfer student from mongoose doc to db doc
  await student.save();
  res.json(student);
};
const getAllStudents = async (req, res) => {
  const students = await Student.find().exec(); //db.students.find()
  res.json(students);
};
const getStudentById = async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id).exec();
  if (!student) {
    res.status(404).json({ error: "Student not found" });
    return;
  }
  res.json(student);
};
const updateStudentById = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;
  const student = await Student.findByIdAndUpdate(
    id,
    { firstName, lastName, email },
    { new: true }
  ).exec();
  if (!student) {
    res.status(404).json({ error: "Student not found" });
    return;
  }
  res.json(student);
};
const deleteStudentById = async (req, res) => {
  const { id } = req.params;
  const student = await Student.findByIdAndDelete(id).exec();
  if (!student) {
    res.status(404).json({ error: "Student not found" });
    return;
  }
  res.sendStatus(204);
};
module.exports = {
  addStudent,
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
};
