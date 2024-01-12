import { Test } from '@nestjs/testing';

import { Auth } from '../domain/roots/auth';
import { AuthInfrastructure } from '../infrastructure/auth.infrastructure';
import { AuthEntity } from '../infrastructure/in-memory/auth.entity';
import { AuthController } from '../infrastructure/presentation/auth.controller';
import { AuthApplication } from './auth.application';

let mod: any;
let authInfrastructure: AuthInfrastructure;
let authApplication: AuthApplication;

describe('AuthApplication', () => {
  beforeEach(async () => {
    mod = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthInfrastructure, AuthEntity, AuthApplication],
    }).compile();
    authInfrastructure = mod.get(AuthInfrastructure);
    authApplication = mod.get(AuthApplication);
  });

  it('login', async () => {
    const auth = new Auth('user01@email.com', '123456');
    const authFound = new Auth(
      'user01@email.com',
      '$2a$10$F4zCuyRv2z7EeRS5BDicmuIZymxUkl7tvpfuGggdpAib6DXIEC8Vq',
    );
    jest
      .spyOn(authInfrastructure, 'findByEmail')
      .mockImplementation(() => Promise.resolve(authFound));

    const result = await authApplication.login(auth);
    expect(result).toHaveProperty('token');
  });
});
