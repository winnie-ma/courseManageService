//this file separate the express route and middleware part from db part in index.js, since for integration test, we want separate test db from real one while import app.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("express-async-errors");
const v1Router = require("./routes");
const unknownError = require("./middleware/error/unknownError");
const validationError = require("./middleware/error/validationError");
const invalidJsonError = require("./middleware/error/invalidJsonError");
const createLogger = require("./utils/logger");
const app = express();
const logger = createLogger(__filename);
app.use(helmet()); //to secure the api with header setting
app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
app.use(morgan("combined", { stream: logger.stream })); //middleware that track the http request like GET /v1/courses/COMP2012 200 23.450 ms - 187
app.use("/v1", v1Router);
//the register order of err middleware matters
app.use(invalidJsonError);
app.use(validationError);
// app.use(notFoundError);
app.use(unknownError);
module.exports = app;
