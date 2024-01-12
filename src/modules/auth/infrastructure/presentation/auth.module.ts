import { Module } from '@nestjs/common';

import { AuthApplication } from '../../application/auth.application';
import { AuthInfrastructure } from '../auth.infrastructure';
import { AuthEntity } from '../in-memory/auth.entity';
import { AuthController } from './auth.controller';

const application = [AuthApplication];
const infrastructure = [AuthInfrastructure, AuthEntity];

@Module({
  controllers: [AuthController],
  providers: [...application, ...infrastructure],
})
export class AuthModule {}
