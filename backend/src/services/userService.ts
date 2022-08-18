import { UserLoginRequestViewModel } from '../models/common/UserLoginRequestViewModel';
import { QuizMainPageDomainModel } from '../models/domain/QuizMainPageDomainModel';
import { UserRegistrationRequestModel } from '../models/request/UserRegistrationRequestModel';
import { UserLoginViewModel } from '../models/view/UserLoginViewModel';
import { getQuizRepository } from '../repositories/getQuizRepository';
import { userRepository } from '../repositories/userRepository';
import { conflictError, unauthorizedError } from './generalErrorService';
import { jwtService } from './jwtService';
import { passwordService } from './passwordService';

export const userService = {
  async register(userData: UserRegistrationRequestModel): Promise<void> {
    if (await this.checkIfUsernameExists(userData.username)) {
      throw conflictError('Username is already taken.');
    }

    if (await this.checkIfEmailExists(userData.email)) {
      throw conflictError('Email is already taken.');
    }

    const hashedPassword = passwordService.generateHash(userData.password);

    await userRepository.registerUser(
      userData.username,
      userData.email,
      hashedPassword,
      userData.admin,
    );
  },

  async login(
    userData: UserLoginRequestViewModel,
  ): Promise<UserLoginViewModel> {
    const user = await userRepository.getUserByName(userData.username);
    if (
      !user ||
      !passwordService.comparePasswords(userData.password, user.password)
    ) {
      throw unauthorizedError('Username or password is incorrect!');
    }

    const token: string = await jwtService.generateAccessToken(
      user.id,
      user.userName,
      user.admin,
    );

    return {
      token,
      username: userData.username,
      points: user.points,
    };
  },

  async checkIfUsernameExists(username: string): Promise<boolean> {
    return !!(await userRepository.getUserByName(username));
  },

  async checkIfEmailExists(email: string): Promise<boolean> {
    return !!(await userRepository.getUserByEmail(email));
  },

  async getQuizzesByUserId(
    userId: number,
    admin: number,
  ): Promise<QuizMainPageDomainModel[]> {
    if (admin === 1) {
      return await getQuizRepository.getQuizMainInfo();
    } else {
      return await userRepository.getQuizzesByUserId(userId);
    }
  },

  async updateUserPoints(points: number, userId: number): Promise<void> {
    await userRepository.updateUserPoints(points, userId);
  },

  async deleteUserQuiz(
    quizId: string,
    userId: number,
    admin: number,
  ): Promise<void> {
    if (admin === 1) {
      await userRepository.deleteUserQuiz(quizId);
    } else {
      const dbUserId = await userRepository.getUserToQuiz(quizId);

      if (userId !== dbUserId) {
        throw unauthorizedError("Can't delete another users quiz.");
      }
      await userRepository.deleteUserQuiz(quizId);
    }
  },
};
