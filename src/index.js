require("dotenv").config();
const express = require("express");
require("express-async-errors");
const v1Router = require("./routes");
const connectToDB = require("./utils/db");
const unknownError = require("./middleware/error/unknownError");
const validationError = require("./middleware/error/validationError");
const invalidJsonError = require("./middleware/error/invalidJsonError");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use("/v1", v1Router);
app.use(invalidJsonError);
app.use(validationError);
// app.use(notFoundError);
app.use(unknownError);
connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
  });
});
