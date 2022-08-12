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
    const addNewData = {
      question: 'Valami question',
      answers: ['one', 'two', 'three'],
      correctAnswer: [true, false, false],
    };

    //Arrange

    getQuizRepository.getMaxTitleId = jest.fn().mockReturnValue(20);
    addQuizRepository.addAndGetNewQuestion = jest
      .fn()
      .mockReturnValue([{ id: 20 }]);
    addQuizRepository.addAnswersToQuestion = jest.fn();

    //Act
    await quizService.addNewQuestion(
      addNewData.question,
      addNewData.answers,
      addNewData.correctAnswer,
    );

    //Assert
    expect(getQuizRepository.getMaxTitleId).toHaveBeenCalledTimes(1);
    expect(addQuizRepository.addAndGetNewQuestion).toHaveBeenCalledTimes(1);
    expect(addQuizRepository.addAndGetNewQuestion).toHaveBeenCalledWith(
      addNewData.question,
      20,
    );
    expect(addQuizRepository.addAnswersToQuestion).toHaveBeenCalledTimes(1);
    expect(addQuizRepository.addAnswersToQuestion).toHaveBeenCalledWith(
      [1, 0, 0],
      addNewData.answers,
      20,
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
    getQuizRepository.getMaxTitleId = jest.fn().mockReturnValue(null);
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
      expect(getQuizRepository.getMaxTitleId).toHaveBeenCalledTimes(1);
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
    getQuizRepository.getMaxTitleId = jest.fn().mockReturnValue(20);
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

describe('get questions to title', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  it('should give back questions and answers if everything is correct', async () => {
    const questionData = [
      {
        titleId: 1,
        title: 'Some title',
        question: 'Question one',
        answer: 'Answer one',
        questionId: 2,
        answerId: 10,
      },
      {
        titleId: 1,
        title: 'Some title',
        question: 'Question one',
        answer: 'Answer two',
        questionId: 2,
        answerId: 11,
      },
    ];

    //Arrange
    getQuizRepository.getQuestionsToTitle = jest
      .fn()
      .mockReturnValue(questionData);

    //Act
    await quizService.getQuestionsToTitle(1);

    //Assert
    expect(getQuizRepository.getQuestionsToTitle).toHaveBeenCalledTimes(1);
    expect(getQuizRepository.getQuestionsToTitle).toHaveBeenCalledWith(1);
  });

  it('should throw error if there are no titles with given id', async () => {
    //Arrange
    const apiError = badRequestError('This title does not exist');
    getQuizRepository.getQuestionsToTitle = jest.fn().mockReturnValue([]);

    try {
      //Act
      await quizService.getQuestionsToTitle(15);
    } catch (err) {
      //Assert
      expect(err).toEqual(apiError);
      expect(getQuizRepository.getQuestionsToTitle).toHaveBeenCalledTimes(1);
    }
  });
});

describe('check if answer is correct', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  it('should respond with 1 or 0', async () => {
    //Arrange
    getQuizRepository.isAnswerCorrect = jest.fn().mockReturnValue(0);

    //Act
    await quizService.isAnswerCorrect(22);

    //Assert
    expect(getQuizRepository.isAnswerCorrect).toHaveBeenCalledTimes(1);
    expect(getQuizRepository.isAnswerCorrect).toHaveBeenCalledWith(22);
  });

  it('should respond with error if answer is not 1 or 0', async () => {
    //Arrange
    const apiError = badRequestError('Given response is invalid');
    getQuizRepository.isAnswerCorrect = jest.fn().mockReturnValue(3);

    try {
      //Act
      await quizService.isAnswerCorrect(25);
    } catch (err) {
      //Assert
      expect(err).toEqual(apiError);
      expect(getQuizRepository.isAnswerCorrect).toHaveBeenCalledTimes(1);
    }
  });
});
