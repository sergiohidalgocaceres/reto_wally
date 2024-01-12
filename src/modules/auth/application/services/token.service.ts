import * as jwt from 'jsonwebtoken';

import { AppService } from '../../../../app.service';
import { Auth } from '../../domain/roots/auth';

export class TokenService {
  static generateAccessToken(auth: Auth): string {
    const { email } = auth.properties;

    const payload = {
      email,
    };

    const secret = AppService.jwt_secret;
    const expiresIn = AppService.jwt_expires_in;
    return jwt.sign(payload, secret, { expiresIn });
  }
}
