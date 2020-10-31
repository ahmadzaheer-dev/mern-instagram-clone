const express = require('express');
const Post = require('../db/models/post');
const auth = require('../middlewares/auth');
const multer = require('multer');
const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');
const dbConnString = require('../db/dbConnString');
const conn = require('../db/mongooseConn');
const mongoose = require('mongoose');
const uuid = require('uuid');

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
      filename: "post_" + uuid.v4() + '_' + Date.now(),
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
    if(!req.file){
        res.status(404).send({err: "Please attach an image with the post"});
    }
    try{
        //Creating a new post 
        const postData = {
            ...req.body,
            user: req.user._id,
            image: req.file.filename
        }

        const post = new Post(postData);
        await post.save();

        res.status(200).send(post);
    } catch(err){
        res.status(500).send({err});
    }
        
});

//API ROUTE FOR STREAMING POST IMAGE
router.get("/api/post/image/:id",auth, async (req, res) => {
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
router.get("/api/posts", auth, async (req,res) => {
  try{
      const posts = await Post.find({ user: req.user._id });
      if(!posts){
        res.status(404).send({err: "There are no posts for this user"});
      }
      res.status(200).send(posts);
  } catch(err){
    res.status(500).send({err});
  }
})

//API ROUTE TO GET TOTAL POST OF A SPECIFIC USER
router.get('/api/posts/:id', auth, async (req, res) => {
  try{
    const posts = await Post.find({ user: req.params.id });
    if(!posts){
      res.status(404).send({err: "There are no posts for this user"});
    }
    res.status(200).send(posts);
  } catch(err){
    res.status(500).send({err});
  }
});

//API ROUTE TO GET A SPECIFIC POST
router.get('/api/post/:id', auth, async (req, res)=>{
  try{
    const post = await Post.findOne({ _id: req.params.id});
    if(!post){
      res.status(404).send({err: "The post is not available"});
    }
    res.status(200).send(post);
  } catch(err){
    res.status(500).send({err});
  }
});

module.exports = router;