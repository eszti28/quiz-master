import app from '../../src/app';
import request from 'supertest';
import { userService } from '../../src/services/userService';
import { jwtService } from '../../src/services/jwtService';
import { userRepository } from '../../src/repositories/userRepository';

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

describe('POST /api/user/login', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  it('Error code 400 should appear if the inputs field are blank', async () => {
    const result = await request(app).post('/api/user/login').send({});

    expect(result.statusCode).toEqual(400);
  });

  it('Error code 400 should appear if the password input field is blank', async () => {
    const result = await request(app)
      .post('/api/user/login')
      .send({ username: 'user123', password: '' });

    expect(result.statusCode).toEqual(400);
  });

  it('Error code 400 should appear if the username input field is blank', async () => {
    const result = await request(app)
      .post('/api/user/login')
      .send({ username: '', password: '12345678' });

    expect(result.statusCode).toEqual(400);
  });

  it('Login is ok and get the whole user object', async () => {
    const loginData = {
      username: 'Eszti',
      password: '12345678910',
    };

    const userAfterLogin = {
      token: 'asdfghuiop',
      username: 'Eszti',
      points: 15,
    };

    userService.login = jest.fn().mockResolvedValue(userAfterLogin);

    const result = await request(app).post('/api/user/login').send(loginData);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(userAfterLogin);
  });
});

describe('GET /api/user/my-quizzes', () => {
  const token = 'asdkfahdlfkas';
  const tokenData = {
    userId: 3,
    userName: 'Eszti',
  };

  const userData = {
    id: 3,
    userName: 'Eszti',
    email: 'eszti@gmail.com',
    password: '12345678',
    points: 0,
  };

  const quizzesById = [
    {
      id: 1,
      title: 'Valami',
      category: 'History',
      userName: 'Eszti',
    },
    {
      id: 2,
      title: 'Valami2',
      category: 'Sport',
      userName: 'Eszti',
    },
  ];

  beforeEach(() => {
    jwtService.getTokenFromRequest = jest.fn().mockReturnValue(token);
    jwtService.verifyToken = jest.fn().mockReturnValue(true);
    jwtService.getTokenPayload = jest.fn().mockReturnValue(tokenData);
    userRepository.getUserByName = jest.fn().mockResolvedValue(userData);
    console.error = jest.fn();
  });

  it("should respond with user's quizzes", async () => {
    userService.getQuizzesByUserId = jest.fn().mockReturnValue(quizzesById);

    const result = await request(app).get('/api/user/my-quizzes');

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(quizzesById);
  });
});

describe('PUT /api/user/points', () => {
  const token = 'asdkfahdlfkas';
  const tokenData = {
    userId: 3,
    userName: 'Eszti',
  };

  const userData = {
    id: 3,
    userName: 'Eszti',
    email: 'eszti@gmail.com',
    password: '12345678',
    points: 0,
  };

  beforeEach(() => {
    jwtService.getTokenFromRequest = jest.fn().mockReturnValue(token);
    jwtService.verifyToken = jest.fn().mockReturnValue(true);
    jwtService.getTokenPayload = jest.fn().mockReturnValue(tokenData);
    userRepository.getUserByName = jest.fn().mockResolvedValue(userData);
    console.error = jest.fn();
  });

  it("should update user's points", async () => {
    userService.updateUserPoints = jest.fn();

    const result = await request(app).put('/api/user/points').send({
      points: 10,
    });

    expect(result.statusCode).toEqual(200);
  });

  it('should throw error if no points is given', async () => {
    userService.updateUserPoints = jest.fn();

    const result = await request(app).put('/api/user/points').send({});

    expect(result.statusCode).toEqual(400);
  });
});

describe('DELETE /api/user/delete/:quizId', () => {
  const token = 'asdkfahdlfkas';
  const tokenData = {
    userId: 3,
    userName: 'Eszti',
  };

  const userData = {
    id: 3,
    userName: 'Eszti',
    email: 'eszti@gmail.com',
    password: '12345678',
    points: 0,
  };

  beforeEach(() => {
    jwtService.getTokenFromRequest = jest.fn().mockReturnValue(token);
    jwtService.verifyToken = jest.fn().mockReturnValue(true);
    jwtService.getTokenPayload = jest.fn().mockReturnValue(tokenData);
    userRepository.getUserByName = jest.fn().mockResolvedValue(userData);
    console.error = jest.fn();
  });

  it("should delete user's quiz", async () => {
    userService.deleteUserQuiz = jest.fn();

    const result = await request(app).delete('/api/user/delete/25');

    expect(result.statusCode).toEqual(200);
  });
});
