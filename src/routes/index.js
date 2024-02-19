const { Router } = require("express");
const studentRouter = require("./student.routes.js");
const courseRouter = require("./course.routes.js");
const userRouter = require("./user.routes.js");
const isAuth = require("../middleware/normal/authGuard.js");
const v1Router = Router();
v1Router.use("/students", isAuth, studentRouter);
v1Router.use("/courses", isAuth, courseRouter);
v1Router.use("/users", userRouter);
module.exports = v1Router;
