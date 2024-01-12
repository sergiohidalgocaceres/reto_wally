import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  static get port(): number {
    return process.env.PORT ? Number(process.env.PORT) : 80;
  }

  static get jwt_secret() {
    return process.env.JWT_SECRET || 'secret';
  }

  static get jwt_expires_in() {
    return process.env.JWT_EXPIRES_IN || '1d';
  }
}
