import { UserRegistrationRequestViewModel } from '../models/view/UserRegistrationRequestViewModel';
import { userRepository } from '../repositories/userRepository';
import { conflictError } from './generalErrorService';

export const userService = {
  async register(
    userData: UserRegistrationRequestViewModel,
  ): Promise<UserRegistrationRequestViewModel> {
    if (await this.checkIfUsernameExists(userData.username)) {
      throw conflictError('Username is already taken.');
    }

    //   const hashedPassword = passwordService.generateHash(userData.password);

    const newUserId = await userRepository.registerUser(
      userData.username,
      userData.email,
      // hashedPassword,
      userData.password,
    );
    console.log(newUserId);

    //   const token: string = await jwtService.generateAccessToken(
    //     newUserId,
    //     userData.username,
    //   );

    return {
      // token,
      username: userData.username,
      password: userData.password,
      email: userData.email,
    };
  },

  async checkIfUsernameExists(username: string): Promise<boolean> {
    return !!(await userRepository.getUserByName(username));
  },
};
