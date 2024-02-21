const { Schema, model } = require("mongoose");

module.exports = model(
  "Teacher",
  new Schema(
    {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please fill a valid email address",
        ],
      },
      courses: [
        {
          type: String,
          ref: "Course",
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);
N;
