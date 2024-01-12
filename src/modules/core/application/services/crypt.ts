import * as bcrypt from 'bcryptjs';

export class Crypt {
  static async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
