const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//DEFINING THE USER SCHEMA FOR USER MODEL
const userSchema = mongoose.Schema({

  //DEFINING THE USERNMAE PROPERTY ON USER SCHEMA
  username: {
    type: String,
    required: true,
    trim: true,
  },

  //DEFINING THE EMAIL PROPERTY ON USER SCHEMA
  email: {
    type: String,
    required: true,
    trim: true,
    unique: [true, "Email is already taken"],
    //CREATING A CUSTOM VALIDATOR FUNCTION FOR EMAIL
    validate(value) {
      //USING VALIDATOR NPM PACKAGE TO VALIDATE EMAIL
      if (!validator.isEmail(value)) {
        throw new Error("The email you provided is not a valid Email");
      }
    },
  },

  //DEFINING THE PASSWORD PROPERTY ON USER SCHEMA
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },

  avatar:{
    type: String
  },

  //DEFINING THE TOKENS PROPERTY WHICH IS AN ARRAY
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//GENERATING AUTHORIZATION TOKEN AND STORING IT IN TOKENS PROPERTY OF USER OBJECT
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    "thisisuserverification"
  );

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

// THIS FUNCTION CHECKS THE DATABASE FOR A USER HAVING EMAIL AND PASSWORD PROVIDED AS ARGUMENTS
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid Credentials");
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (validPassword) {
    return user;
  } else {
    throw new Error("Invalid Credentials");
  }
};

// THIS FUNCTION WILL BE AUTOMATICALLY CALLED BEFORE SAVING THE DOCUMENT
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
