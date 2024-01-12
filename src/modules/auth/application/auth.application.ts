import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { Crypt } from '../../core/application/services/crypt';
import { AuthRepository } from '../domain/repositories/auth.repository';
import { Auth } from '../domain/roots/auth';
import { AuthInfrastructure } from '../infrastructure/auth.infrastructure';
import { AuthLoginResponse } from './dtos/auth.dto';
import { TokenService } from './services/token.service';

@Injectable()
export class AuthApplication {
  constructor(
    @Inject(AuthInfrastructure) private readonly repository: AuthRepository,
  ) {}

  async login(auth: Auth) {
    const authFound = await this.repository.findByEmail(auth.properties.email);
    if (!authFound) {
      throw new BadRequestException('User not found');
    }

    const { password } = auth.properties;

    if (!(await Crypt.compare(password, authFound.properties.password))) {
      throw new BadRequestException("Password doesn't match");
    }

    const authLoginResponse: AuthLoginResponse = new AuthLoginResponse();
    authLoginResponse.token = TokenService.generateAccessToken(authFound);

    return authLoginResponse;
  }
}
