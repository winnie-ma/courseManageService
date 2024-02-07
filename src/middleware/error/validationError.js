module.exports = (error, req, res, next) => {
  //deal with the error caused by schema validate
  if (error.name === "ValidationError") {
    res.status(400).json({ error: error.message });
    return;
  }
  next(error);
};
