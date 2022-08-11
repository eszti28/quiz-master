import * as bcrypt from 'bcrypt';

export const passwordService = {
  generateHash(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  },
};
