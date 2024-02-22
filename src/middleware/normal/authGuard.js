const User = require("../../models/user.model");
const { validateToken } = require("../../utils/jwt");

module.exports = (req, res, next) => {
  const authorization = req.header("Authorization");
  // console.log(authorization);
  const authType = authorization?.split(" ")[0];
  const authToken = authorization?.split(" ")[1];
  if (!authType || !authToken) {
    res.status(401).json({ error: "Missing authorization in header" });
    return;
  }
  if (authType !== "Bearer") {
    res.status.json({ error: "Invalid token" });
  } else {
    const [decoded, err] = validateToken(authToken);
    if (err && err.name === "TokenExpiredError") {
      res.status(401).json({ error: "Expired Token" });
      return;
    } else if (err && err.name === "JsonWebTokenError") {
      res.status(401).json({ error: "Access Denied" });
      return;
    }
    next();
  }
};
