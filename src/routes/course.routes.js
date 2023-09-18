const { Router } = require("express");
const courseRouter = Router();
const {
  getAllCourses,
  getCourseById,
  addCourse,
  updateCourseById,
  deleteCourseById,
} = require("../controllers/course.controllers");
courseRouter.get("", getAllCourses);
courseRouter.get("/:id", getCourseById);
courseRouter.post("", addCourse);
courseRouter.patch("/:id", updateCourseById);
courseRouter.delete("/:id", deleteCourseById);
module.exports = courseRouter;
