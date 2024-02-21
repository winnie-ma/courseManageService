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
const roleGuard = require("../middleware/normal/roleGuard");
courseRouter.get("/", getAllCourses);
courseRouter.get("/:courseId", objectValidation, getCourseById);
courseRouter.patch("/:courseId", objectValidation, updateCourseById);

//only admin can do post and delete
courseRouter.use(roleGuard);
courseRouter.post("/", addCourse);
courseRouter.delete("/:courseId", objectValidation, deleteCourseById);
module.exports = courseRouter;
