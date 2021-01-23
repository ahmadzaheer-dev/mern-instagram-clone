const express = require("express");
const Feed = require("../db/models/feed");
const Post = require("../db/models/post");
const Profile = require("../db/models/profile");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/api/feed", auth, async (req, res) => {
  try {
    const feed = await Feed.findOne({ user: req.user._id });
    if (!feed) {
      return res
        .status(404)
        .send({ err: "You need to create your profile first" });
    }

    if (feed.posts.length < 1) {
      return res.status(400).send({ err: "Your feed is empty" });
    }
    await feed.populate("posts.postId").execPopulate();
    await feed.populate("posts.user").execPopulate();
    await feed.populate("posts.postId.comments.user").execPopulate();
    res.status(200).send(feed.posts);
  } catch (err) {
    res.status(500).send({ err });
  }
});

module.exports = router;
