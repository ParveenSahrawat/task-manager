const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/task');

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/tasks', auth, async (req, res) => {
    const match = {};
    const sort = {};
    const { completed, limit, skip, sortBy } = req.query;

    if (completed)
        match.completed = completed === 'true';

    if(sortBy) {
        const parts = sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(limit),
                skip: parseInt(skip),
                sort
            }
        }).execPopulate();
        if (!req.user.tasks)
            res.status(404).send();
        res.send(req.user.tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/tasks/:_id', auth, async (req, res) => {
    const allowedUpdates = Object.keys(Task.schema.paths).filter(val => {
        return !['_id', '__v'].includes(val);
    });
    const updates = Object.keys(req.body);
    const isUpdateValid = updates.every(update => allowedUpdates.includes(update));

    if (!isUpdateValid)
        res.status(400).send({ error: 'Invalid Updates' });

    try {
        const task = await Task.findOne({
            _id: req.params._id, owner: req.user._id
        });

        if (!task)
            return res.status(404).send();

        updates.forEach(update => task[update] = req.body[update]);
        await task.save();
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/tasks/:_id', auth, async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params._id, owner: req.user._id
        });
        if (!task)
            return res.status(404).send();
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/tasks/:_id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params._id, owner: req.user._id
        });

        if (!task)
            return res.status(404).send();
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;