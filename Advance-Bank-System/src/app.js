const express = require("express");
const path = require('path');
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/auth.routes');
const app = express();

app.use(express.json());  
app.use(cookieParser());



app.use("/api/auth", authRouter);debugger

module.exports = app;