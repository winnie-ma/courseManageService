const { Router } = require("express");
const courseRouter = Router();
const {
  getAllCourses,
  getCourseById,
  addCourse,
  updateCourseById,
  deleteCourseById,
} = require("../controllers/course.controllers");
const objectValidation = require("../middleware/normal/idValidation");
courseRouter.get("/", getAllCourses);
courseRouter.get("/:courseId", objectValidation, getCourseById);
courseRouter.post("/", addCourse);
courseRouter.patch("/:courseId", objectValidation, updateCourseById);
courseRouter.delete("/:courseId", objectValidation, deleteCourseById);
module.exports = courseRouter;
