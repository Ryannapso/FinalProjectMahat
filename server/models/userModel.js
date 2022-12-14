const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 15,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    Lname: {
      type: String,
      maxlength: 15,
    },
    phone: {
      type: String,
      required: true,
      maxlength: 10,
    },
    location: {
      type: String,
      maxlength: 15,
    },

    image: {
      type: String,
    },
    role: {
      type: String,
      default: "cr",
      enum: ["admin", "cr", "tech"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
