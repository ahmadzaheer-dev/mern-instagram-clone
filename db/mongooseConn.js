const mongoose = require('mongoose');
const dbConnString = require('./dbConnString');

//CONNECTING TO DATABASE
mongoose.connect(dbConnString, { useNewUrlParser: true, useUnifiedTopology: true })
const conn = mongoose.createConnection(dbConnString, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = conn;