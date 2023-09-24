const { Router } = require("express");
const {
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  addStudent,
  addStudentToCourse,
  removeStudentFromCourse,
} = require("../controllers/student.controllers");
const objectValidation = require("../middleware/normal/idValidation");
const studentRouter = Router();
studentRouter.get("/", getAllStudents);
studentRouter.get("/:studentId", objectValidation, getStudentById);
studentRouter.patch("/:studentId", objectValidation, updateStudentById);
studentRouter.delete("/:studentId", objectValidation, deleteStudentById);
studentRouter.post("/", addStudent);
studentRouter.post(
  "/:studentId/courses/:courseId",
  objectValidation,
  addStudentToCourse
);
studentRouter.delete(
  "/:studentId/courses/:courseId",
  objectValidation,
  removeStudentFromCourse
);

module.exports = studentRouter;
