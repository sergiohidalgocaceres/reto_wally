import { Controller, Get } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { HealthCheck } from '@nestjs/terminus';

@ApiExcludeController()
@Controller('healthcheck')
export class HealthCheckController {
  @Get()
  @HealthCheck()
  check() {
    return {
      status: 'ok',
      info: {
        database: {
          status: 'up',
        },
      },
      error: {},
      details: {
        database: {
          status: 'up',
        },
      },
    };
  }
}
