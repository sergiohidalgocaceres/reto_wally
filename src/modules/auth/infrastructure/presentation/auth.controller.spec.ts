import { Test } from '@nestjs/testing';

import { AuthApplication } from '../../application/auth.application';
import { AuthInfrastructure } from '../auth.infrastructure';
import { AuthEntity } from '../in-memory/auth.entity';
import { AuthController } from './auth.controller';
import { AuthLoginDto } from './dto/auth-login';

let mod: any;
let authApplication: AuthApplication;
let authController: AuthController;

describe('AuthController', () => {
  beforeEach(async () => {
    mod = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthInfrastructure, AuthEntity, AuthApplication],
    }).compile();
    authApplication = mod.get(AuthApplication);
    authController = mod.get(AuthController);
  });

  it('login', async () => {
    const auth = new AuthLoginDto();
    auth.email = 'user01@email.com';
    auth.password = '123456';
    const user = {
      email: 'user01@email.com',
      password: '$2a$10$F4zCuyRv2z7EeRS5BDicmuIZymxUkl7tvpfuGggdpAib6DXIEC8Vq',
    };
    jest
      .spyOn(authApplication, 'login')
      .mockImplementation(() =>
        Promise.resolve({
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIwMUBlbWFpbC5jb20iLCJpYXQiOjE3MDUwODI3NDksImV4cCI6MTcwNTE2OTE0OX0.t9xBwD-a7X6CMoNzs0QA_0x0WVW-vuViHIJ6Y6gtv1g',
        }),
      );

    const result = await authController.login(auth);
    expect(result).toHaveProperty('token');
  });
});
