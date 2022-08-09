import { addQuizRepository } from '../../src/repositories/addQuizRepository';
import { getQuizRepository } from '../../src/repositories/getQuizRepository';
import {
  badRequestError,
  notFoundError,
} from '../../src/services/generalErrorService';
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

  it('should throw error if there are no titles yet', async () => {
    const addNewQuestion = {
      question: 'Valami question',
      answers: ['one', 'two', 'three'],
      correctAnswer: [true, false, false],
    };

    //Arrange
    const apiError = notFoundError("There aren't any titles yet");
    getQuizRepository.getQuizMainInfo = jest.fn().mockReturnValue([]);
    addQuizRepository.addAnswersToQuestion = jest.fn();

    try {
      //Act
      await quizService.addNewQuestion(
        addNewQuestion.question,
        addNewQuestion.answers,
        addNewQuestion.correctAnswer,
      );
    } catch (err) {
      //Assert
      expect(err).toEqual(apiError);
      expect(getQuizRepository.getQuizMainInfo).toHaveBeenCalledTimes(1);
      expect(addQuizRepository.addAnswersToQuestion).toHaveBeenCalledTimes(0);
    }
  });

  it('should throw error if there are no questions yet', async () => {
    const addNewQuestion = {
      question: 'Valami question',
      answers: ['one', 'two', 'three'],
      correctAnswer: [true, false, false],
    };

    //Arrange
    const apiError = notFoundError("There aren't any questions yet");
    getQuizRepository.getQuizMainInfo = jest.fn().mockReturnValue([
      {
        id: 20,
        title: 'Valami',
        category: 'Movies',
        userName: 'Béla',
      },
    ]);
    addQuizRepository.addAndGetNewQuestion = jest.fn().mockReturnValue([]);
    addQuizRepository.addAnswersToQuestion = jest.fn();

    try {
      //Act
      await quizService.addNewQuestion(
        addNewQuestion.question,
        addNewQuestion.answers,
        addNewQuestion.correctAnswer,
      );
    } catch (err) {
      //Assert
      expect(err).toEqual(apiError);
      expect(getQuizRepository.getQuizMainInfo).toHaveBeenCalledTimes(1);
      expect(addQuizRepository.addAndGetNewQuestion).toHaveBeenCalledTimes(1);
      expect(addQuizRepository.addAnswersToQuestion).toHaveBeenCalledTimes(0);
    }
  });
});
