const { Schema, model } = require("mongoose");
module.exports = model(
  "Course",
  new Schema({
    _id: {
      alias: "code", //only exist on mongoose level not in db, virtual property
      type: String,
      required: true,
      uppercase: true, //when call api, mongoose will update the id to upperSpace and save to db
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "Course description",
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  })
);
