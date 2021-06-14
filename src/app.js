require('./db/mongoose');
const express = require('express');
const cors = require('cors');
const app = express();

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

app.use(cors());

// To parse the incoming request data
app.use(express.json());
app.use(userRouter)
app.use(taskRouter);

module.exports = app;