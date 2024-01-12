import { Auth } from '../../domain/roots/auth';
import { IUser } from '../in-memory/auth.entity';

export class AuthDto {
  static fromDataToDomain(data: IUser): Auth {
    return new Auth(data.email, data.password);
  }
}
