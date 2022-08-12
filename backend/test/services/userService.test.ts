import { userRepository } from '../../src/repositories/userRepository';
import { conflictError } from '../../src/services/generalErrorService';
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
});
