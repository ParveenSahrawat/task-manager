require('./db/mongoose');
const express = require('express');
const app = express();

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const port = process.env.PORT || 3000;

// To parse the incoming request data
app.use(express.json());

app.use(userRouter)
app.use(taskRouter);

const multer = require('multer');
const upload = multer({
    'dest': 'images',
});
app.post('/upload', upload.single('upload'), (req, res) => {
    res.send();
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});