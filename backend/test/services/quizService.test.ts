import { addQuizRepository } from '../../src/repositories/addQuizRepository';
import { getQuizRepository } from '../../src/repositories/getQuizRepository';
import { badRequestError } from '../../src/services/generalErrorService';
import { quizService } from '../../src/services/quizService';

describe('quizService get main info', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  it('get main info method response and calls the right methods', async () => {
    const getMainInfoData = [
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

    //Arrange
    getQuizRepository.getQuizMainInfo = jest
      .fn()
      .mockResolvedValue(getMainInfoData);

    //Act
    const mainInfoService = await quizService.getQuizMainInfo();

    //Assert
    expect(mainInfoService).toEqual(getMainInfoData);
    expect(getQuizRepository.getQuizMainInfo).toHaveBeenCalledTimes(1);
  });
});

describe('get quizzes by category', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  it('should get quizzes by given category', async () => {
    const getMainInfoDataByCategory = [
      {
        id: 14,
        title: 'Valami title',
        category: 'History',
        userName: 'Eszti',
      },
      {
        id: 15,
        title: 'Valami másik title',
        category: 'History',
        userName: 'Barni',
      },
    ];

    //Arrange
    getQuizRepository.getQuizzesByCategory = jest
      .fn()
      .mockResolvedValue(getMainInfoDataByCategory);

    //Act
    const quizzesByCategory = await quizService.getQuizzesByCategory('History');

    //Assert
    expect(quizzesByCategory).toEqual(getMainInfoDataByCategory);
    expect(getQuizRepository.getQuizzesByCategory).toHaveBeenCalledTimes(1);
    expect(getQuizRepository.getQuizzesByCategory).toHaveBeenCalledWith(
      'History',
    );
  });

  it('should give 400 error if category is not valid', async () => {
    //Arrange
    const apiError = badRequestError('Invalid category type');
    getQuizRepository.getQuizzesByCategory = jest.fn();

    //Act
    try {
      await quizService.getQuizzesByCategory('');
    } catch (err) {
      //Assert
      expect(err).toEqual(apiError);
      expect(getQuizRepository.getQuizzesByCategory).toHaveBeenCalledTimes(0);
    }
  });
});

describe('add new title to quiz database', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  it('should add new title if correct data', async () => {
    //Arrange
    addQuizRepository.addNewTitle = jest.fn();

    //Act
    await quizService.addNewTitle('Some title', 'History', 3);

    //Assert
    expect(addQuizRepository.addNewTitle).toHaveBeenCalledTimes(1);
    expect(addQuizRepository.addNewTitle).toHaveBeenCalledWith(
      'Some title',
      'History',
      3,
    );
  });

  it('should throw error when not given right data', async () => {
    //Arrange
    const apiError = badRequestError('All fields are required');
    addQuizRepository.addNewTitle = jest.fn();

    //Act
    try {
      await quizService.addNewTitle('Some title', '', -1);
    } catch (err) {
      expect(err).toEqual(apiError);
      expect(addQuizRepository.addNewTitle).toHaveBeenCalledTimes(0);
    }
  });
});

describe('add new question to database', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  it('should give question to database', async () => {
    const getMainInfo = [
      {
        id: 15,
        title: 'Valami title',
        category: 'History',
        userName: 'Eszti',
      },
    ];

    const addNewData = {
      question: 'Valami question',
      answers: ['one', 'two', 'three'],
      correctAnswer: [true, false, false],
    };

    //Arrange

    getQuizRepository.getQuizMainInfo = jest.fn().mockReturnValue(getMainInfo);
    addQuizRepository.addAndGetNewQuestion = jest
      .fn()
      .mockReturnValue([{ id: 35 }]);
    addQuizRepository.addAnswersToQuestion = jest.fn();

    //Act
    await quizService.addNewQuestion(
      addNewData.question,
      addNewData.answers,
      addNewData.correctAnswer,
    );

    //Assert
    expect(getQuizRepository.getQuizMainInfo).toHaveBeenCalledTimes(1);
    expect(addQuizRepository.addAndGetNewQuestion).toHaveBeenCalledTimes(1);
    expect(addQuizRepository.addAndGetNewQuestion).toHaveBeenCalledWith(
      addNewData.question,
      15,
    );
    expect(addQuizRepository.addAnswersToQuestion).toHaveBeenCalledTimes(1);
    expect(addQuizRepository.addAnswersToQuestion).toHaveBeenCalledWith(
      [1, 0, 0],
      addNewData.answers,
      35,
    );
  });
});
