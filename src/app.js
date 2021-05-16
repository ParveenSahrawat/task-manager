require('./db/mongoose');
const express = require('express');
const app = express();

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

// To parse the incoming request data
app.use(express.json());
app.use(userRouter)
app.use(taskRouter);

module.exports = app;