import { UserLoginRequestViewModel } from '../models/common/UserLoginRequestViewModel';
import { QuizMainPageDomainModel } from '../models/domain/QuizMainPageDomainModel';
import { UserRegistrationRequestModel } from '../models/request/UserRegistrationRequestModel';
import { UserLoginViewModel } from '../models/view/UserLoginViewModel';
import { UserRegistrationViewModel } from '../models/view/UserRegistrationViewModel';
import { userRepository } from '../repositories/userRepository';
import { conflictError, unauthorizedError } from './generalErrorService';
import { jwtService } from './jwtService';
import { passwordService } from './passwordService';

export const userService = {
  async register(
    userData: UserRegistrationRequestModel,
  ): Promise<UserRegistrationViewModel> {
    if (await this.checkIfUsernameExists(userData.username)) {
      throw conflictError('Username is already taken.');
    }

    const hashedPassword = passwordService.generateHash(userData.password);

    const newUserId = await userRepository.registerUser(
      userData.username,
      userData.email,
      hashedPassword,
    );

    //token generálás nem szükséges, és majd controllerben nem küldünk vissza semmit
    const token: string = jwtService.generateAccessToken(
      newUserId,
      userData.username,
    );

    return {
      token: token,
      userName: userData.username,
    };
  },

  async login(
    userData: UserLoginRequestViewModel,
  ): Promise<UserLoginViewModel> {
    const playerData = await userRepository.getUserByName(userData.username);
    if (
      !playerData ||
      !passwordService.comparePasswords(userData.password, playerData.password)
    ) {
      throw unauthorizedError('Username or password is incorrect!');
    }

    const token: string = jwtService.generateAccessToken(
      playerData.id,
      playerData.userName,
    );

    return {
      token,
      username: userData.username,
      points: playerData.points,
    };
  },

  async checkIfUsernameExists(username: string): Promise<boolean> {
    return !!(await userRepository.getUserByName(username));
  },

  async getQuizzesByUserId(userId: number): Promise<QuizMainPageDomainModel[]> {
    return await userRepository.getQuizzesByUserId(userId);
  },

  async updateUserPoints(points: number, userId: number): Promise<void> {
    await userRepository.updateUserPoints(points, userId);
  },

  async deleteUserQuiz(quizId: string, userId: number): Promise<void> {
    const dbUserId = await userRepository.getUserToQuiz(quizId);

    if (userId !== dbUserId) {
      throw unauthorizedError("Can't delete another users quiz.");
    }
    await userRepository.deleteUserQuiz(quizId);
  },
};
