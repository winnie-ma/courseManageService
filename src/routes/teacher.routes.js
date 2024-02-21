const { Router } = require("express");
const {
  getAllTeachers,
  getTeacherById,
  addTeacher,
  updateTeacherById,
  deleteTeacherById,
  addTeacherToCourse,
  removeTeacherFromCourse,
} = require("../controllers/student.controllers");
const objectValidation = require("../middleware/normal/idValidation");
const roleGuard = require("../middleware/normal/roleGuard");
const teacherRouter = Router();
teacherRouter.get("/", getAllTeachers);
teacherRouter.get("/:teacherId", objectValidation, getTeacherById);
teacherRouter.patch("/:teacherId", objectValidation, updateTeacherById);
teacherRouter.post(
  "/:teacherId/courses/:courseId",
  objectValidation,
  addTeacherToCourse
);
teacherRouter.delete(
  "/:teacherId/courses/:courseId",
  objectValidation,
  removeTeacherFromCourse
);

teacherRouter.use(roleGuard);
teacherRouter.post("/", addTeacher);
teacherRouter.delete("/:teacherId", objectValidation, deleteTeacherById);
module.exports = teacherRouter;
