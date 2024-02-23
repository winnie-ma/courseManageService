require("dotenv").config();
const createLogger = require("./utils/logger"); //middleware that to log
const connectToDB = require("./utils/db");
const app = require("./app");
const logger = createLogger(__filename);
const PORT = process.env.PORT || 3000;

connectToDB().then(() => {
  app.listen(PORT, () => {
    logger.info(`server listening on port ${PORT}`);
  });
});
