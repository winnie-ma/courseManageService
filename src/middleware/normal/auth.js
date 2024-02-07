const User = require("../../models/user.model");
const { validateToken } = require("../../utils/jwt");
require("dotenv").config();
const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  const authType = authorization?.split(" ")[0];
  const authToken = authorization?.split(" ")[1];
  if (!authType || !authToken) {
    res.status(401).json({ error: "Access Denied" });
    return;
  }
  if (authType === "Bearer") {
    const [decoded, err] = validateToken(authToken);
    if (err && err.name === "TokenExpiredError") {
      res.status(401).json({ error: "Expired Token" });
      return;
    } else if (err && err.name === "JsonWebTokenError") {
      res.status(401).json({ error: "Access Denied" });
      return;
    }
    const user = await User.findById(decoded._id);
    if (!user) {
      res.status(401).json({ error: "Invalid user" });
      return;
    }
    req.user = user;
    next();
  }
};
module.exports = isAuth;
