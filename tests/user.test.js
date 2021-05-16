jest.setTimeout(30000);
const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { userOne, userOneId, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should signup a new user', async () => {
    const result = await request(app).post('/users/signup').send({
        name: 'abcd',
        email: 'abcd@123.com',
        password: '1234567'
    }).expect(201);

    const user = await User.findById(result.body.user._id);
    expect(user).not.toBe(null);

    expect(result.body).toMatchObject({
        user: {
            name: 'abcd',
            email: 'abcd@123.com'
        },
        token: user.tokens[0].token
    });

    expect(user.password).not.toBe('1234567');
});

test('Should login existing user', async () => {
    const result = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);

    const user = await User.findById(userOneId);
    expect(result.body.token).toBe(user.tokens[1].token);
});

test('Should not login non-existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'lmmvsmbs'
    }).expect(400);
});

test('Should get user profile', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401);
});

test('Should delete account for user', async () => {
    const result = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    const user = await User.findById(userOneId);
    expect(user).toBeNull();
});

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401);
});

test('Should upload user avatar', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/nodejs.png')
        .expect(200);

    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer));
});

test('Should update user data', async () => {
    const data = {
        name: 'Peter Parker',
        email: 'parker@example.com',
        password: '7654321',
        age: 25
    }

    const result = await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send(data)
        .expect(200);

    expect(result.body.name).toBe(data.name);
});

test('Should not update invalid fields', async () => {
    const data = {
        location: 'Nowhere'
    }

    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send(data)
        .expect(400);
});