const express = require('express');
const app = express();
require('./db/mongooseConn');

const userRouter = require('./routes/user');
const profileRouter = require('./routes/profile');
const postRouter = require('./routes/post')


app.use(express.json());
app.use(userRouter);
app.use(profileRouter);
app.use(postRouter);


// PORT
const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log('Server is up on port: ' + port);
})