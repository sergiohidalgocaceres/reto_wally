import { Test } from '@nestjs/testing';

import { AuthApplication } from '../application/auth.application';
import { Auth } from '../domain/roots/auth';
import { AuthInfrastructure } from '../infrastructure/auth.infrastructure';
import { AuthEntity } from '../infrastructure/in-memory/auth.entity';
import { AuthController } from '../infrastructure/presentation/auth.controller';

let mod: any;
let authInfrastructure: AuthInfrastructure;
let authEntity: AuthEntity;

describe('AuthInfrastructure', () => {
  beforeEach(async () => {
    mod = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthInfrastructure, AuthEntity, AuthApplication],
    }).compile();
    authInfrastructure = mod.get(AuthInfrastructure);
    authEntity = mod.get(AuthEntity);
  });

  it('findByEmail', async () => {
    const auth = new Auth('user01@email.com', '123456');
    const user = {
      email: 'user01@email.com',
      password: '$2a$10$F4zCuyRv2z7EeRS5BDicmuIZymxUkl7tvpfuGggdpAib6DXIEC8Vq',
    };
    jest
      .spyOn(authEntity, 'findByEmail')
      .mockImplementation(() => Promise.resolve(user));

    const result = await authInfrastructure.findByEmail(user.email);
    expect(result).toHaveProperty('email');
    expect(result).toHaveProperty('password');
    expect(result.properties.email).toBe(user.email);
  });
});
