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

    expect(result).toThrowError('Invalid category type');
  });
});
