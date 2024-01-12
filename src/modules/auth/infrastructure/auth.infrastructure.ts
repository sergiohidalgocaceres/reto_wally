import { Injectable } from '@nestjs/common';

import { Auth } from '../domain/roots/auth';
import { AuthDto } from './dtos/auth.dto';
import { AuthEntity } from './in-memory/auth.entity';

@Injectable()
export class AuthInfrastructure {
  constructor(private readonly entity: AuthEntity) {}

  async findByEmail(email: string): Promise<Auth | undefined> {
    const data = await this.entity.findByEmail(email);

    if (data) {
      return AuthDto.fromDataToDomain(data);
    }

    return undefined;
  }
}
