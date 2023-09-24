const ObjectId = require("mongoose").Types.ObjectId;
const reg = /^[a-zA-z]+[0-9]+$/;
module.exports = (req, res, next) => {
  const { studentId, courseId } = req.params;
  console.log(studentId, courseId);
  if (
    (studentId && !ObjectId.isValid(studentId)) ||
    (courseId && !reg.test(courseId))
  ) {
    res.status(404).json({ error: "invalidObjectId params error" });
    return;
  }
  next();
};
