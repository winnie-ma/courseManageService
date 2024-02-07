const ObjectId = require("mongoose").Types.ObjectId;
const reg = /^[a-zA-z]+[0-9]+$/;
//is to deal with wrong id params
module.exports = (req, res, next) => {
  const { studentId, courseId } = req.params;
  if (
    (studentId && !ObjectId.isValid(studentId)) ||
    (courseId && !reg.test(courseId))
  ) {
    res.status(404).json({ error: "invalidObjectId params error" });
    return;
  }
  next();
};
