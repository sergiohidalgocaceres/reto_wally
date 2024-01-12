import { Auth } from '../roots/auth';

export interface AuthRepository {
  findByEmail(email: string): Promise<Auth | undefined>;
}
