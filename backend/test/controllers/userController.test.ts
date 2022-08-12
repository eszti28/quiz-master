import app from '../../src/app';
import request from 'supertest';
import { userService } from '../../src/services/userService';

describe('POST /api/user/register', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  it('Error code 400 when neither username, email nor password is provided', async () => {
    const result = await request(app).post('/api/user/register').send({});

    expect(result.statusCode).toEqual(400);
  });

  it('Error code 400 when password is not provided', async () => {
    const result = await request(app)
      .post('/api/user/register')
      .send({ username: 'Eszti', email: 'eszti@gmail.com' });

    expect(result.statusCode).toEqual(400);
  });

  it('Error code 400 when username is not provided', async () => {
    const result = await request(app)
      .post('/api/user/register')
      .send({ password: 12345678, email: 'eszti@gmail.com' });

    expect(result.statusCode).toEqual(400);
  });

  it('Error code 400 when email is not provided', async () => {
    const result = await request(app)
      .post('/api/user/register')
      .send({ username: 'Eszti', password: 12345678 });

    expect(result.statusCode).toEqual(400);
  });

  it('Error code 400 when password is less than 8 characters long', async () => {
    const result = await request(app).post('/api/user/register').send({
      username: 'Eszti',
      password: '12345',
      email: 'valami@valami.com',
    });

    expect(result.statusCode).toEqual(400);
  });

  it('receives the correct object when registration is done', async () => {
    const requestData = {
      username: 'Eszti',
      password: '12345678',
      email: 'tike@gmail.com',
    };

    userService.register = jest.fn();

    const result = await request(app)
      .post('/api/user/register')
      .send(requestData);

    expect(result.statusCode).toEqual(201);
  });
});
