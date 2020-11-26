const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  name: {
    type: String,
    required: true,
    trim: true,
  },

  bio: {
    type: String,
    required: true,
  },

  website: {
    type: String,
  },

  phone: {
    type: String,
  },

  gender: {
    type: String,
    validate(value) {
      if (!(value === "Male" || value === "Female")) {
        throw new Error("Gender not valid");
      }
    },
  },

  followers: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    },
  ],

  following: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    },
  ],
});

const profile = mongoose.model("Profile", profileSchema);

module.exports = profile;
