import request from 'supertest';
import app from '../../src/app';
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
  const titleData = {
    title: 'Some title',
    category: 'Sport',
    userId: 3,
  };

  beforeEach(() => {
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

  beforeEach(() => {
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
