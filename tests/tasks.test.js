const request = require('supertest');
const Task = require('../src/models/task');
const app = require('../src/app');
const {
    userOne,
    userOneId,
    userTwo,
    userTwoId,
    taskOne,
    taskSecond,
    taskThird,
    setupDatabase
} = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should create task for user', async () => {
    const result = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'From the test'
        })
        .expect(201);

    const task = await Task.findById(result.body._id);
    expect(task).not.toBeNull();
    expect(task.completed).toEqual(false);
});

test('Should get tasks of a user', async () => {
    const result = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    expect(result.body.length).toEqual(2);
});

test('Should delete its own task', async () => {
    const result = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    const task = await Task.findById(taskOne._id);

    expect(task).toBeNull();
});

test('Should not delete others task', async () => {
    const result = await request(app)
        .delete(`/tasks/${taskThird._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404);

    const task = await Task.findById(taskThird._id);

    expect(task).not.toBeNull();
});