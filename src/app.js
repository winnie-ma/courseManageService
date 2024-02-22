//this file separate the express route and middleware part from db part in index.js, since for integration test, we want separate test db from real one while import app.js
const express = require("express");
const cors = require("cors");
require("express-async-errors");
const v1Router = require("./routes");
const unknownError = require("./middleware/error/unknownError");
const validationError = require("./middleware/error/validationError");
const invalidJsonError = require("./middleware/error/invalidJsonError");
const app = express();
app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
app.use("/v1", v1Router);
//the register order of err middleware matters
app.use(invalidJsonError);
app.use(validationError);
// app.use(notFoundError);
app.use(unknownError);
module.exports = app;
