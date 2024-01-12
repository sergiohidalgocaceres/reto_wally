import { Body, Controller, Post, Version } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiGatewayTimeoutResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import {
  GenericError,
  ResponseDescription,
} from '../../../core/presentation/errors/error-generic';
import { AuthApplication } from '../../application/auth.application';
import { AuthLoginResponse } from '../../application/dtos/auth.dto';
import { Auth } from '../../domain/roots/auth';
import { AuthLoginDto } from './dto/auth-login';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authApplication: AuthApplication) {}

  @Post('login')
  @Version('1')
  @ApiOperation({
    summary: 'Login',
  })
  @ApiCreatedResponse({
    description: 'User logged',
    type: AuthLoginResponse,
  })
  @ApiBadRequestResponse({
    type: GenericError,
    description: ResponseDescription.BAD_REQUEST,
  })
  @ApiInternalServerErrorResponse({
    type: GenericError,
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  @ApiGatewayTimeoutResponse({
    type: GenericError,
    description: ResponseDescription.API_GATEWAY_TIMEOUT,
  })
  async login(@Body() body: AuthLoginDto) {
    const { email, password } = body;
    const auth = new Auth(email, password);
    const tokens: Awaited<AuthLoginResponse> =
      await this.authApplication.login(auth);
    return tokens;
  }
}
