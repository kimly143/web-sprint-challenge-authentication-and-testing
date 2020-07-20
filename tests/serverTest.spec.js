const request = require('supertest');

const db = require('../database/dbConfig');
const server = require('../api/server');

describe('server', () => {
    beforeEach(() => {
        return db('users').truncate();
    });

    describe('POST /api/auth/register', () => {
        it('returns 422 when username and password are not given', async () => {
            const response = await request(server).post('/api/auth/register', {});
            expect(response.status).toEqual(422);
            expect(response.body.error).toEqual('username and password required to register!');
        });

        it('returns 201 when user is registered', async () => {
            const response = await request(server).post('/api/auth/register').send({
                username: 'kimbuck',
                password: 'password',
            });
            expect(response.status).toEqual(201);
            expect(response.body.id).toBeDefined();
            expect(response.body.username).toEqual('kimbuck');
        });
    });

    describe('POST /api/auth/login', () => {
        beforeEach(() => {
            return request(server).post('/api/auth/register').send({ 
                username: 'kimbuck', 
                password: 'password',
            });
        })

        it('returns 422 when failed to login', async () => {
            const response = await request(server).post('/api/auth/login').send({
                username: 'nope',
                password: 'wrong',
            });
            expect(response.status).toEqual(422);
            expect(response.body.error).toEqual('failed to login');
        });

        it('responds with an empty 200 and cookie when login success', async () => {
            const response = await request(server).post('/api/auth/login').send({
                username: 'kimbuck',
                password: 'password',
            });

            expect(response.status).toEqual(200);
            expect(response.body).toEqual({});
            expect(response.headers['set-cookie'][0]).toMatch(/sid=/);
        })
    });

    describe('GET /api/jokes', () => {
        beforeEach(() => {
            return request(server).post('/api/auth/register').send({ 
                username: 'kimbuck', 
                password: 'password',
            });
        });

        it('fails when you are not logged in', async () => {
            const response = await request(server).get('/api/jokes');

            expect(response.status).toEqual(401);
            expect(response.body.you).toEqual('shall not pass!');
        });

        it('returns an array of jokes when you are logged in', async () => {
            const loginResponse = await request(server).post('/api/auth/login').send({
                username: 'kimbuck',
                password: 'password',
            });
            const response = await request(server).get('/api/jokes').set('Cookie', loginResponse.headers['set-cookie']);
            expect(response.status).toEqual(200);
            expect(response.body.length).toBeGreaterThan(0);
        })
    })
})