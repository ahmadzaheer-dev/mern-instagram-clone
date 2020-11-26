const express = require("express");
const app = express();
const cors = require("cors");
require("./db/mongooseConn");

const userRouter = require("./routes/user");
const profileRouter = require("./routes/profile");
const postRouter = require("./routes/post");
const feedRouter = require("./routes/feed");

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(profileRouter);
app.use(postRouter);
app.use(feedRouter);

// PORT
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is up on port: " + port);
});
