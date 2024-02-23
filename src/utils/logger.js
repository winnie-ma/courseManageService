const winston = require("winston");
const path = require("path");

//custom the winston log with config to output like [2024-02-23T14:42:00.429Z] [info] [index.js]: [server listening on port 3000], add to file that want to do the log
const createLogger = (filePath) => {
  const logger = winston.createLogger({
    level: "info",
    defaultMeta: {
      file: path.basename(filePath), //from path get the file name
    },
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message, file }) => {
        return `[${timestamp}] [${level}] [${file}]: [${message}]`;
      })
    ), //formatted the log msg
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: "logs/error.log",
        level: "error",
      }),
      new winston.transports.File({
        filename: "logs/info.log",
        level: "info", //here info and above level will output to info.log file
      }),
    ], //output the logs to console and also according log file with level
  });
  logger.stream = {
    write: (message) => {
      logger.info(message);
    },
  }; //when morgan track http request, will trigger write function here and output track info to log file
  return logger;
};
module.exports = createLogger;
