module.exports = (error, req, res, next) => {
  console.error(error);
  res
    .status(500)
    .json({ error: "Unexpected error happened, pls try again later" });
};
