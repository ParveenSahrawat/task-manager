const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const router = new express.Router();
const User = require('../models/user');

const { sendWelcomeEmail, sendCancellationEmail } = require('../emails/account');
const auth = require('../middleware/auth');
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error('Please upload an image'));
        }

        cb(undefined, true);
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();

        res.send({ user, token });
    } catch (error) {
        res.status(400).send();
    }
});

router.post('/users/signup', async (req, res) => {
    console.log(req.body);
    try {
        const user = new User(req.body);
        const result = await user.save();
        sendWelcomeEmail(user.email, user.name);
        const token = await result.generateAuthToken({ _id: result._id.toString() }, process.env.JWT_SECRET);

        res.status(201).send({ user: result, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });

        await req.user.save();

        res.send();
    } catch (error) {
        res.status(500).send();
    }
});

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send();
    }
});

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer)
        .resize({ width: 250, height: 250 })
        .png().toBuffer();

    req.user.avatar = buffer;
    await req.user.save();
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});

router.delete('/users/me/avatar', auth, async (req, res) => {
    try {
        req.user.avatar = undefined;
        await req.user.save();
        res.send(req.user);
    } catch (error) {
        res.status(500).send();
    }
});

router.get('/users/:_id', async (req, res) => {
    try {
        const _id = req.params._id;
        const user = await User.findById(_id);
        if (!user)
            return res.status(404).send();
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/users/:_id/avatar', async (req, res) => {
    try {thisismynodecourse
        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    } catch (error) {
        res.status(404).send();
    }
});

router.patch('/users/me', auth, async (req, res) => {
    const allowedUpdates = Object.keys(User.schema.paths).filter(val => {
        return !['_id', '__v'].includes(val);thisismynodecourse
    });
    const updates = Object.keys(req.body);
    const isUpdateValid = updates.every(update => allowedUpdates.includes(update));

    if (!isUpdateValid)
        res.status(400).send({ error: 'Invalid Updates' });

    try {
        updates.forEach(update => req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        sendCancellationEmail(req.user.email, req.user.name);
        res.send(req.user);
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = router;