import { UserLoginRequestViewModel } from '../../src/models/common/UserLoginRequestViewModel';
import { UserLoginViewModel } from '../../src/models/view/UserLoginViewModel';
import { userRepository } from '../../src/repositories/userRepository';
import {
  conflictError,
  unauthorizedError,
} from '../../src/services/generalErrorService';
import { jwtService } from '../../src/services/jwtService';
import { passwordService } from '../../src/services/passwordService';
import { userService } from '../../src/services/userService';

describe('userService', () => {
  it('register should give the proper result', async () => {
    const userData = {
      username: 'Valaki',
      password: '12345678',
      email: 'newwm@gmail.com',
    };

    const user = {
      token: 'asdasdasg3654684651651',
      userName: 'Valaki',
    };

    //Arrange
    userRepository.getUserByName = jest.fn().mockResolvedValue(null);
    passwordService.generateHash = jest.fn().mockReturnValue('abcdefu12345');
    userRepository.registerUser = jest.fn().mockResolvedValue(25);
    jwtService.generateAccessToken = jest
      .fn()
      .mockReturnValue('asdasdasg3654684651651');

    //Act
    const result = await userService.register(userData);

    //Assert
    expect(result).toEqual(user);
    expect(userRepository.getUserByName).toHaveBeenCalledTimes(1);
    expect(userRepository.getUserByName).toHaveBeenCalledWith('Valaki');
    expect(userRepository.registerUser).toHaveBeenCalledTimes(1);
    expect(userRepository.registerUser).toHaveBeenCalledWith(
      'Valaki',
      'newwm@gmail.com',
      'abcdefu12345',
    );
  });

  it('should throw error if username already exists', async () => {
    const apiError = conflictError('Username is already taken.');
    const userData = {
      username: 'Valaki',
      password: '12345678',
      email: 'newwm@gmail.com',
    };

    //Arrange
    userService.checkIfUsernameExists = jest.fn().mockReturnValue(true);
    try {
      //Act
      const result = await userService.register(userData);
    } catch (err) {
      expect(err).toEqual(apiError);
      expect(userRepository.getUserByName).toHaveBeenCalledTimes(1);
      expect(userRepository.getUserByName).toHaveBeenCalledWith('Valaki');
    }
  });

  it('login should give the proper result', async () => {
    //Arrange
    const userLoginData: UserLoginRequestViewModel = {
      username: 'Eszti',
      password: '12345678',
    };

    const userData = {
      id: 3,
      userName: 'Eszti',
      email: 'eszti@gmail.com',
      password: '12345678',
      points: 15,
    };

    const user: UserLoginViewModel = {
      token: 'asdasdasg365468465165',
      username: 'Eszti',
      points: 15,
    };

    const token = 'asdasdasg365468465165';
    const hashedPassword = '12345678';

    userRepository.getUserByName = jest.fn().mockReturnValue(userData);
    passwordService.comparePasswords = jest.fn().mockReturnValue(true);
    jwtService.generateAccessToken = jest.fn().mockResolvedValue(token);

    //Act
    const result = await userService.login(userLoginData);

    //Assert
    expect(result).toEqual(user);
    expect(jwtService.generateAccessToken).toHaveBeenCalledTimes(1);
    expect(userRepository.getUserByName).toHaveBeenCalledTimes(1);
    expect(userRepository.getUserByName).toHaveBeenCalledWith(
      userData.userName,
    );
    expect(passwordService.comparePasswords).toHaveBeenCalledWith(
      userLoginData.password,
      hashedPassword,
    );
  });

  it('login error 401 because compare password service returns false', async () => {
    //Arrange
    const userLoginData: UserLoginRequestViewModel = {
      username: 'Eszti',
      password: '123456789101112',
    };

    const userData = {
      id: 3,
      userName: 'Eszti',
      email: 'eszti@gmail.com',
      password: '12345678',
      points: 15,
    };

    const apiError = unauthorizedError('Username or password is incorrect!');

    userRepository.getUserByName = jest.fn().mockResolvedValue(userData);
    passwordService.comparePasswords = jest.fn().mockResolvedValue(false);

    try {
      //Act
      await userService.login(userLoginData);
    } catch (err) {
      //Assert
      expect(err).toEqual(apiError);
      expect(userRepository.getUserByName).toHaveBeenCalledTimes(1);
      expect(passwordService.comparePasswords).toHaveBeenCalledWith(
        userLoginData.password,
        userData.password,
      );
      expect(passwordService.comparePasswords).toHaveBeenCalledTimes(1);
      expect(jwtService.generateAccessToken).toHaveBeenCalledTimes(1);
    }
  });

  it('get quizzes by userId', async () => {
    const userQuizzes = [
      {
        id: 1,
        title: 'valami',
        category: 'Sport',
        userName: 'Eszti',
      },
      {
        id: 2,
        title: 'valami2',
        category: 'Sport',
        userName: 'Eszti',
      },
    ];
    //Arrange
    userRepository.getQuizzesByUserId = jest
      .fn()
      .mockResolvedValue(userQuizzes);

    //Act
    const quizzesByUserId = await userService.getQuizzesByUserId(3);

    //Assert
    expect(quizzesByUserId).toEqual(userQuizzes);
    expect(userRepository.getQuizzesByUserId).toHaveBeenCalledTimes(1);
    expect(userRepository.getQuizzesByUserId).toHaveBeenCalledWith(3);
  });

  it('update user points', async () => {
    //Arrange
    userRepository.updateUserPoints = jest.fn();

    //Act
    await userService.updateUserPoints(15, 3);

    //Assert
    expect(userRepository.updateUserPoints).toHaveBeenCalledTimes(1);
    expect(userRepository.updateUserPoints).toHaveBeenCalledWith(15, 3);
  });

  it("deletes user's quiz", async () => {
    //Arrange
    userRepository.getUserToQuiz = jest.fn().mockReturnValue(3);
    userRepository.deleteUserQuiz = jest.fn();

    //Act
    await userService.deleteUserQuiz('15', 3);

    //Assert
    expect(userRepository.getUserToQuiz).toHaveBeenCalledTimes(1);
    expect(userRepository.getUserToQuiz).toHaveBeenCalledWith('15');
    expect(userRepository.deleteUserQuiz).toHaveBeenCalledTimes(1);
    expect(userRepository.deleteUserQuiz).toHaveBeenCalledWith('15');
  });

  it("throws error when userId doesn't belong to quizId", async () => {
    //Arrange
    const apiError = unauthorizedError("Can't delete another users quiz.");
    userRepository.getUserToQuiz = jest.fn().mockReturnValue(5);
    userRepository.deleteUserQuiz = jest.fn();

    try {
      //Act
      await userService.deleteUserQuiz('15', 3);
    } catch (err) {
      //Assert
      expect(err).toEqual(apiError);
      expect(userRepository.getUserToQuiz).toHaveBeenCalledTimes(1);
      expect(userRepository.getUserToQuiz).toHaveBeenCalledWith('15');
      expect(userRepository.deleteUserQuiz).toHaveBeenCalledTimes(0);
    }
  });
});
