import request from 'supertest';
import app from '../../src/app';
import { userRepository } from '../../src/repositories/userRepository';
import { jwtService } from '../../src/services/jwtService';
import { quizService } from '../../src/services/quizService';

describe('get quiz main info /quizzes/main-info', () => {
  const expectedMainInfo = [
    {
      id: 14,
      title: 'Valami title',
      category: 'History',
      userName: 'Eszti',
    },
    {
      id: 15,
      title: 'Valami másik title',
      category: 'Movies',
      userName: 'Barni',
    },
  ];
  beforeEach(() => {
    console.error = jest.fn();
  });

  it('should return with expected object', async () => {
    quizService.getQuizMainInfo = jest.fn().mockResolvedValue(expectedMainInfo);

    const result = await request(app).get('/api/quizzes/main-info');

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(expectedMainInfo);
  });
});

describe('get quiz by category /quizzes/category/:category', () => {
  const expectedMainInfoByCategory = [
    {
      id: 14,
      title: 'Valami title',
      category: 'Movies',
      userName: 'Eszti',
    },
    {
      id: 15,
      title: 'Valami másik title',
      category: 'Movies',
      userName: 'Barni',
    },
  ];
  beforeEach(() => {
    console.error = jest.fn();
  });

  it('should return with expected object', async () => {
    quizService.getQuizzesByCategory = jest
      .fn()
      .mockResolvedValue(expectedMainInfoByCategory);

    const result = await request(app).get('/api/quizzes/category/Movies');

    expect(quizService.getQuizzesByCategory).toHaveBeenCalledWith('Movies');
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(expectedMainInfoByCategory);
  });

  it('should throw error if category is invalid', async () => {
    const result = await request(app).get('/api/quizzes/category/Music');

    expect(result.statusCode).toEqual(400);
  });
});

describe('add new title make-quiz/title', () => {
  const token = 'asdkfahdlfkas';
  const tokenData = {
    userId: 3,
    userName: 'Eszti',
    admin: 1,
  };

  const titleData = {
    title: 'Some title',
    category: 'Sport',
    userId: 3,
  };

  const userData = {
    id: 3,
    userName: 'Eszti',
    email: 'eszti@gmail.com',
    password: '12345678',
    score: 0,
  };

  beforeEach(() => {
    jwtService.getTokenFromRequest = jest.fn().mockReturnValue(token);
    jwtService.verifyToken = jest.fn().mockReturnValue(true);
    jwtService.getTokenPayload = jest.fn().mockReturnValue(tokenData);
    userRepository.getUserByName = jest.fn().mockResolvedValue(userData);
    console.error = jest.fn();
  });

  it('should add new title to database', async () => {
    quizService.addNewTitle = jest.fn();

    const result = await request(app)
      .post('/api/make-quiz/title')
      .send(titleData);

    expect(result.statusCode).toEqual(200);
  });

  it('should throw error without title', async () => {
    quizService.addNewTitle = jest.fn();

    const result = await request(app)
      .post('/api/make-quiz/title')
      .send({ category: 'Sport', userId: 3 });

    expect(result.statusCode).toEqual(400);
  });
});

describe('add new question make-quiz/new-question', () => {
  const token = 'asdkfahdlfkas';
  const tokenData = {
    userId: 3,
    userName: 'Eszti',
    admin: 1,
  };

  const rigthQuestionData = {
    question: 'Some question',
    answerOne: 'answer one',
    isCorrectOne: false,
    answerTwo: 'answer two',
    isCorrectTwo: false,
    answerThree: 'answer three',
    isCorrectThree: true,
  };

  const badQuestionData = {
    question: 'Some question',
    answers: [''],
    correctAnswers: [''],
  };

  const tooManyRightAnswers = {
    question: 'Some question',
    answerOne: 'answer one',
    isCorrectOne: true,
    answerTwo: 'answer two',
    isCorrectTwo: false,
    answerThree: 'answer three',
    isCorrectThree: true,
  };

  const userData = {
    id: 3,
    userName: 'Eszti',
    email: 'eszti@gmail.com',
    password: '12345678',
    score: 0,
  };

  beforeEach(() => {
    jwtService.getTokenFromRequest = jest.fn().mockReturnValue(token);
    jwtService.verifyToken = jest.fn().mockReturnValue(true);
    jwtService.getTokenPayload = jest.fn().mockReturnValue(tokenData);
    userRepository.getUserByName = jest.fn().mockResolvedValue(userData);
    console.error = jest.fn();
  });

  it('should add new question to database', async () => {
    quizService.addNewQuestion = jest.fn();

    const result = await request(app)
      .post('/api/make-quiz/new-question')
      .send(rigthQuestionData);

    expect(result.statusCode).toEqual(200);
  });

  it('should throw error without given right data', async () => {
    quizService.addNewQuestion = jest.fn();

    const result = await request(app)
      .post('/api/make-quiz/new-question')
      .send(badQuestionData);

    expect(result.statusCode).toEqual(400);
  });

  it('should throw error if more than one right answer is given', async () => {
    quizService.addNewQuestion = jest.fn();

    const result = await request(app)
      .post('/api/make-quiz/new-question')
      .send(tooManyRightAnswers);

    expect(result.statusCode).toEqual(400);
  });
});

describe('get question to title', () => {
  const token = 'asdkfahdlfkas';
  const tokenData = {
    userId: 3,
    userName: 'Eszti',
    admin: 1,
  };

  const userData = {
    id: 3,
    userName: 'Eszti',
    email: 'eszti@gmail.com',
    password: '12345678',
    score: 0,
  };

  const questionsAndAnswers = [
    {
      title: 'valami',
      id: 1,
      question: 'A question?',
      answers: [
        {
          id: 1,
          answer: 'answer one',
        },
        {
          id: 2,
          answer: 'answer two',
        },
        {
          id: 3,
          answer: 'answer three',
        },
      ],
    },
    {
      title: 'valami2',
      id: 1,
      question: 'Another question?',
      answers: [
        {
          id: 4,
          answer: 'answer one',
        },
        {
          id: 5,
          answer: 'answer two',
        },
        {
          id: 6,
          answer: 'answer three',
        },
      ],
    },
  ];

  beforeEach(() => {
    jwtService.getTokenFromRequest = jest.fn().mockReturnValue(token);
    jwtService.verifyToken = jest.fn().mockReturnValue(true);
    jwtService.getTokenPayload = jest.fn().mockReturnValue(tokenData);
    userRepository.getUserByName = jest.fn().mockResolvedValue(userData);
    console.error = jest.fn();
  });

  it('should respond with all the questions', async () => {
    quizService.getQuestionsToTitle = jest.fn();

    const result = await request(app)
      .get('/api/play-quiz/1')
      .send(questionsAndAnswers);

    expect(result.statusCode).toEqual(200);
  });

  it('should respond with notFoundError if title id is not given', async () => {
    quizService.getQuestionsToTitle = jest.fn();

    const result = await request(app).get('/api/play-quiz/');

    expect(result.statusCode).toEqual(404);
  });
});

describe('check if answer is correct', () => {
  const token = 'asdkfahdlfkas';
  const tokenData = {
    userId: 3,
    userName: 'Eszti',
    admin: 1,
  };

  const userData = {
    id: 3,
    userName: 'Eszti',
    email: 'eszti@gmail.com',
    password: '12345678',
    score: 0,
  };

  beforeEach(() => {
    jwtService.getTokenFromRequest = jest.fn().mockReturnValue(token);
    jwtService.verifyToken = jest.fn().mockReturnValue(true);
    jwtService.getTokenPayload = jest.fn().mockReturnValue(tokenData);
    userRepository.getUserByName = jest.fn().mockResolvedValue(userData);
    console.error = jest.fn();
  });

  it('should respond with 200 if everything is right', async () => {
    quizService.isAnswerCorrect = jest.fn();

    const result = await request(app)
      .get('/api/play-quiz/isCorrect/15')
      .send('1');

    expect(result.statusCode).toEqual(200);
  });

  it('should respond with notFoundError if answer id is not given', async () => {
    quizService.isAnswerCorrect = jest.fn();

    const result = await request(app).get('/api/play-quiz/');

    expect(result.statusCode).toEqual(404);
  });
});
