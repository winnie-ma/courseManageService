const { validateToken } = require("../../utils/jwt");

module.exports = (req, res, next) => {
  const authorization = req.header("Authorization");
  const token = authorization?.split(" ")[1];
  const [decoded, err] = validateToken(token);
  if (decoded.role !== "admin") {
    res.status(403).json({ error: "invalid permission" });
    return;
  }
  next();
};
