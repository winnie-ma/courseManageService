const jwt = require("jsonwebtoken");
const User = require("../../models/user.model");
require("dotenv").config();
const isAuth = (req, res, next) => {
  const { authorization } = req.headers;
  const authType = authorization?.split(" ")[0];
  const authToken = authorization?.split(" ")[1];
  if (!authType || !authToken) {
    res.status(401).json({ error: "Access Denied" });
    return;
  }
  if (authType === "Bearer") {
    jwt.verify(authToken, process.env.TOKEN_KEY, async (err, decoded) => {
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
    });
  }
};
module.exports = isAuth;
