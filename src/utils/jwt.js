const jwt = require("jsonwebtoken");

// secret
const secret = process.env.TOKEN_KEY;

const generateAuthToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: "1d" });
};

const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    return [decoded, undefined];
  } catch (e) {
    return [undefined, e];
  }
};

module.exports = {
  generateAuthToken,
  validateToken,
};
