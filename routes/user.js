const express = require("express");
const User = require("../db/models/user");
const auth = require("../middlewares/auth");
const multer = require("multer");
const Grid = require("gridfs-stream");
const GridFsStorage = require("multer-gridfs-storage");
const dbConnString = require("../db/dbConnString");
const conn = require("../db/mongooseConn");
const mongoose = require("mongoose");

const router = new express.Router();

let gfs;

//USING GRIDFS_STREAM
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("avatars");
});

//CREATING A NEW STORAGE WITH MULTER_GRIDFS_STORAGE
const storage = new GridFsStorage({
  url: dbConnString,
  file: (req, file) => {
    return {
      filename: "file_" + Date.now(),
      bucketName: "avatars",
    };
  },
});

//FUNCTION THAT WILL FILTER ONLY IMAGES
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//SETTING UP MULTER CONFIGURATION
const upload = multer({ storage, fileFilter });

//API ROUTE FOR UPLOADING SINGLE IMAGE
router.post(
  "/api/user/avatar",
  auth,
  upload.single("avatars"),
  async (req, res) => {
    console.log("entered request");
    if (req.file) {
      // Deleting the previous avatar image if it exists
      if (req.user.avatar) {
        gfs.remove(
          { filename: req.user.avatar, root: "avatars" },
          (err, gridStore) => {
            if (err) {
              return res.status(404).json({ err: err });
            }
          }
        );
      }
      // Attaching the avatar name with user
      try {
        req.user.avatar = req.file.filename;
        await req.user.save();
        res.status(200).send(req.user);
      } catch (err) {
        res.send({ err });
      }
    }
  }
);

//API ROUTE STREAMING USER AVATAR
router.get("/api/user/avatar", async (req, res) => {
  gfs.files.findOne({ filename: req.user.avatar }, (err, file) => {
    if (file) {
      let readstream = gfs.createReadStream(file);
      readstream.pipe(res);
    } else {
      res.send({ err: "Image doesn't exist" });
    }
  });
});

router.get("/api/user/avatar/:filename", async (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (file) {
      let readstream = gfs.createReadStream(file);
      readstream.pipe(res);
    } else {
      res.send({ err: "Image doesn't exist" });
    }
  });
});

//TO REGISTER A NEW USER
router.post("/api/user/register", async (req, res) => {
  //Checking if the user already exists
  const userInDB = await User.findOne({ email: req.body.email });
  if (userInDB) {
    return res.status(400).send({ err: "This email is already taken" });
  }
  //Registering a new user
  const user = new User(req.body);
  try {
    await user.save();
    //Generating a new authorization token
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send({ err });
  }
});

//TO LOGIN USER
router.post("/api/user/login", async (req, res) => {
  try {
    //Finding the user
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    //Generating authorization token if the user exists
    const token = await user.generateAuthToken();
    //Responding with user and token
    res.status(200).send({ user, token });
  } catch (err) {
    res.status(400).send({ err });
  }
});

router.patch("/api/password/change", auth, async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.user.email,
      req.body.oldPassword
    );

    if (user) {
      req.user.password = req.body.newPassword;
      await req.user.save();
      res.status(200).send();
    }
  } catch (err) {
    res.status(400).send({ err });
  }
});

//LOGGING OUT OF SPECIFIC SESSION
router.post("/api/user/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((cur) => cur.token !== req.token);
    await req.user.save();
    res.status(200).send();
  } catch (err) {
    res.status(500).send({ err });
  }
});

//LOGGING OUT OF ALL SESSION
router.post("/api/user/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    req.user.save();
    res.status(200).send();
  } catch (err) {
    res.status(500).send({ err });
  }
});

//Getting the info of a user
router.get("/api/user", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    if (!user) {
      return res.status(404).send({ err: "User not found" });
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ err });
  }
});

router.get("/api/search/autofill/:searchstr", async (req, res) => {
  try {
    const regex = new RegExp(req.params.searchstr, "i");
    const users = User.find({ username: regex }).limit(10);
    users.exec(function (err, data) {
      let result = [];

      if (!err) {
        if (data && data.length && data.length > 0) {
          data.forEach((user) => {
            let obj = {
              _id: user._id,
              username: user.username,
              avatar: user.avatar,
            };
            result.push(obj);
          });
        }
      }
      res.status(200).send(result);
    });
  } catch (err) {
    res.status(500).send({ err });
  }
});

module.exports = router;
