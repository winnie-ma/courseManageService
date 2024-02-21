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
const roleGuard = require("../middleware/normal/roleGuard");
const studentRouter = Router();
studentRouter.get("/", getAllStudents);
studentRouter.get("/:studentId", objectValidation, getStudentById);
studentRouter.patch("/:studentId", objectValidation, updateStudentById);
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

studentRouter.use(roleGuard);
studentRouter.post("/", addStudent);
studentRouter.delete("/:studentId", objectValidation, deleteStudentById);
module.exports = studentRouter;
