const express = require("express");
const Post = require("../db/models/post");
const auth = require("../middlewares/auth");
const multer = require("multer");
const Grid = require("gridfs-stream");
const GridFsStorage = require("multer-gridfs-storage");
const dbConnString = require("../db/dbConnString");
const conn = require("../db/mongooseConn");
const mongoose = require("mongoose");
const uuid = require("uuid");
const Feed = require("../db/models/feed");
const Profile = require("../db/models/profile");
const User = require("../db/models/user");

const router = new express.Router();

let gfs;

//USING GRIDFS_STREAM
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("posts");
});

//CREATING A NEW STORAGE WITH MULTER_GRIDFS_STORAGE
const storage = new GridFsStorage({
  url: dbConnString,
  file: (req, file) => {
    return {
      filename: "post_" + uuid.v4() + "_" + Date.now(),
      bucketName: "posts",
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
router.post("/api/post", auth, upload.single("posts"), async (req, res) => {
  if (!req.file) {
    res.status(404).send({ err: "Please attach an image with the post" });
  }
  try {
    //Creating a new post
    const postData = {
      ...req.body,
      user: req.user._id,
      image: req.file.filename,
    };

    const post = new Post(postData);
    await post.save();

    // 1. Getting the Follower details
    const profile = await Profile.findOne({ user: req.user._id });
    profile.followers.forEach(async (follower) => {
      const feed = await Feed.findOne({ user: follower.user });
      feed.posts.unshift({ postId: post.id, user: req.user._id });
      await feed.save();
    });

    res.status(200).send(post);
  } catch (err) {
    res.status(500).send({ err });
  }
});

//API ROUTE FOR STREAMING POST IMAGE
router.get("/api/post/image/:id", async (req, res) => {
  gfs.files.findOne({ filename: req.params.id }, (err, file) => {
    if (file) {
      let readstream = gfs.createReadStream(file);
      readstream.pipe(res);
    } else {
      res.send({ err: "Image doesn't exist" });
    }
  });
});

//API ROUTE TO GET TOTAL POST OF A USER
router.get("/api/posts", auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user._id });
    if (!posts) {
      res.status(404).send({ err: "There are no posts for this user" });
    }
    res.status(200).send(posts);
  } catch (err) {
    res.status(500).send({ err });
  }
});

router.get("/api/posts/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
      res.status(404).send({ err: "User not found" });
    }

    const posts = await Post.find({ user: user.id });
    if (!posts) {
      res.status(404).send({ err: "There are no posts for this user" });
    }
    res.status(200).send(posts);
  } catch (err) {
    res.status(500).send({ err });
  }
});

//API ROUTE TO GET TOTAL POST OF A SPECIFIC USER
router.get("/api/posts/:id", async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.id });
    if (!posts) {
      res.status(404).send({ err: "There are no posts for this user" });
    }
    res.status(200).send(posts);
  } catch (err) {
    res.status(500).send({ err });
  }
});

//API ROUTE TO GET A SPECIFIC POST
router.get("/api/post/:id", auth, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    if (!post) {
      res.status(404).send({ err: "The post is not available" });
    }
    res.status(200).send(post);
  } catch (err) {
    res.status(500).send({ err });
  }
});

//API ROUTE FOR LIKING A POST
router.put("/api/post/like/:id", auth, async (req, res) => {
  try {
    //1. finding the post
    const post = await Post.findOne({ _id: req.params.id });
    if (!post) {
      return res.status(404).send({ err: "The post is unavailable" });
    }

    //2. Checking if the post is already liked
    const like = post.likes.filter((like) => {
      return like.user === req.user._id;
    });

    if (like.length > 0) {
      return res.status(400).send({ err: "The post is already liked" });
    }

    //3. Adding the like details
    post.likes.unshift({ user: req.user._id });
    //4. Saving the post
    await post.save();
    //5. Sending the response
    res.status(200).send(post);
  } catch (err) {
    res.status(500).send({ err });
  }
});

//API ROUTE FOR UNLIKING A POST
router.delete("/api/post/like/:id/:like_id", auth, async (req, res) => {
  try {
    //Finding the post
    const post = await Post.findOne({ _id: req.params.id });
    //Checking if the post exist
    if (!post) {
      return res.status(404).send({ err: "The post does not exist" });
    }
    //Finding the like
    const like = post.likes.find(
      (like) => like._id.toString() === req.params.like_id
    );
    //Checking if the like exists
    if (!like) {
      return res.status(404).send({ err: "The post is already unliked" });
    }
    //Checking if the user is authenticated to update that like
    if (like.user.toString() !== req.user._id.toString()) {
      return res.status(400).send({ err: "The user is not authorized" });
    }
    //Finding the index of like to be removed
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    //Removing that like
    post.likes.splice(removeIndex, 1);
    //Saving the post
    await post.save();
    res.status(200).send(post.likes);
  } catch (err) {
    res.status(500).send({ err });
  }
});

//API ROUTE FOR ADDING A COMMENT ON A POST
router.put("/api/post/comment/:id", auth, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    if (!post) {
      return res.status(404).send({ err: "The post is unavailable" });
    }
    const comment = {
      ...req.body,
      user: req.user._id,
    };
    post.comments.unshift(comment);
    await post.save();
    res.status(200).send(post);
  } catch (err) {
    res.status(500).send({ err });
  }
});

//API ROUTE FOR EDITING A COMMENT ON A POST
router.patch("/api/post/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    //Finding the post
    const post = await Post.findOne({ _id: req.params.id });
    //Checking if the post exist
    if (!post) {
      return res.status(404).send({ err: "The post does not exist" });
    }
    //Finding the comment
    const comment = post.comments.find(
      (comment) => comment._id.toString() === req.params.comment_id
    );
    //Checking if the comment exists
    if (!comment) {
      return res.status(404).send({ err: "The comment does not exist" });
    }
    //Checking if the user is authenticated to update that comment

    if (comment.user.toString() !== req.user.id) {
      return res.status(400).send({ err: "The user is not authorized" });
    }
    //Editing the comment
    post.comments.forEach((comment) => {
      if (comment._id.toString() === req.params.comment_id) {
        comment.caption = req.body.caption;
      }
    });
    //saving the post
    await post.save();
    res.status(200).send(post.comments);
  } catch (err) {
    res.status(500).send({ err });
  }
});

//API ROUTE FOR DELETING A COMMENT ON A POST
router.delete("/api/post/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    //Finding the post
    const post = await Post.findOne({ _id: req.params.id });
    //Checking if the post exist
    if (!post) {
      return res.status(404).send({ err: "The post does not exist" });
    }
    //Finding the comment
    const comment = post.comments.find(
      (comment) => comment._id.toString() === req.params.comment_id
    );
    //Checking if the comment exists
    if (!comment) {
      return res.status(404).send({ err: "The comment does not exist" });
    }
    //Checking if the user is authenticated to update that comment
    if (
      comment.user.toString() !== req.user._id.toString() &&
      req.user._id.toString() !== post.user.toString()
    ) {
      return res.status(400).send({ err: "The user is not authorized" });
    }
    //Finding the index of comment to be removed
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);
    //Removing that comment
    post.comments.splice(removeIndex, 1);
    //Saving the post
    await post.save();
    res.status(200).send(post.comments);
  } catch (err) {
    res.status(500).send({ err });
  }
});

module.exports = router;
