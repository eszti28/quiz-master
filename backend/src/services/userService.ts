import { UserRegistrationRequestModel } from '../models/request/UserRegistrationRequestModel';
import { UserRegistrationViewModel } from '../models/view/UserRegistrationViewModel';
import { userRepository } from '../repositories/userRepository';
import { conflictError } from './generalErrorService';
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

    const token: string = jwtService.generateAccessToken(
      newUserId,
      userData.username,
    );

    return {
      token: token,
      userName: userData.username,
    };
  },

  async checkIfUsernameExists(username: string): Promise<boolean> {
    return !!(await userRepository.getUserByName(username));
  },
};
