import bcrypt from 'bcrypt';
import app from '../src/index.js';
import request from 'supertest';
import { connect } from '../src/model/connection.js';

const TEST_DB = 'mongodb://localhost:27017/Blogging_test';

describe('E2E tests', () => {
  let mongodb;

  const clearDB = async () => {
    if (mongodb) {
      const collections = await mongodb.connection.db.collections();
      for (let collection of collections) {
        await collection.deleteMany();
      }
    }
  };

  beforeAll(async () => {
    mongodb = await connect(TEST_DB);
  });

  afterAll(async () => {
    await mongodb.connection.close();
  });

  beforeEach(async () => {
    await clearDB();
  });

  describe('Auth (e2e)', () => {
    const registerUser = async (user) => {
      return request(app).post('/api/auth/register').send(user);
    };

    const loginUser = async (user) => {
      return request(app).post('/api/auth/login').send(user);
    };

    describe('(POST) - Register User', () => {
      it('should throw a validation error if password is missing', async () => {
        const res = await registerUser({
          first_name: 'TEST',
          last_name: 'USER',
          email: 'test@test.com',
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('"password" is required');
      });

      it('should register a user successfully', async () => {
        const res = await registerUser({
          first_name: 'TEST',
          last_name: 'USER',
          email: 'test@test.com',
          password: 'password123',
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toEqual('User created successfully');
      });

      it('should return an error for duplicate registration', async () => {
        await mongodb.connection.db.collection('users').insertOne({
          first_name: 'TEST',
          last_name: 'USER',
          email: 'test@test.com',
          password: 'password123',
        });
        const res = await registerUser({
          first_name: 'TEST',
          last_name: 'USER',
          email: 'test@test.com',
          password: 'password123',
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('User already registered');
      });
    });

    describe('(POST) - Login User', () => {
      it('should throw a validation error if password is missing', async () => {
        const res = await loginUser({
          email: 'test@test.com',
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('"password" is required');
      });

      it('should login successfully', async () => {
        await mongodb.connection.db.collection('users').insertOne({
          first_name: 'TEST',
          last_name: 'USER',
          email: 'test@test.com',
          password: await bcrypt.hash('password', 10),
        });

        const res = await loginUser({
          email: 'test@test.com',
          password: 'password',
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toEqual('Login successful');
        expect(res.body.data).toHaveProperty('accessToken');
        expect(res.body.data).not.toHaveProperty('password');
      });

      it('should return an error for invalid email or password', async () => {
        await mongodb.connection.db.collection('users').insertOne({
          first_name: 'TEST',
          last_name: 'USER',
          email: 'test@test.com',
          password: await bcrypt.hash('password', 10),
        });

        const res = await loginUser({
          email: 'yopmail@test.com',
          password: 'invalid123',
        });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toEqual('email or password incorrect');
      });
    });
  });
});
