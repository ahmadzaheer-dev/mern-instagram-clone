const express = require('express');
const app = express();
require('./db/mongooseConn');

const userRouter = require('./routes/user');
const profileRouter = require('./routes/profile');


app.use(express.json());
app.use(userRouter);
app.use(profileRouter);

// PORT
const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log('Server is up on port: ' + port);
})