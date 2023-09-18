const mongoose = require("mongoose");
const connectToDB = () => {
  const connectionString = process.env.CONNECTION_STRING;
  if (!connectionString) {
    console.error("CONNECTION_STRING is not defined");
    process.exit(1);
    //0 is normal exit while other not
  }
  const db = mongoose.connection;
  db.on("error", (error) => {
    console.error(error);
    process.exit(2);
  });
  db.on("connected", () => {
    console.log("DB connected");
  });
  db.on("disconnected", () => {
    console.log("DB disconnected"); //not exit since mongoose will retry connection after one fail
  });
  return mongoose.connect(connectionString); //here return promise,although connect to db is async, we return the promise, hence can not write the await, the same for async
};
module.exports = connectToDB;
