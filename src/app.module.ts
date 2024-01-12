import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';

import { AppService } from './app.service';
import { HealthCheckController } from './healthcheck.controller';
import { AuthModule } from './modules/auth/infrastructure/presentation/auth.module';
import { ExchangeRateModule } from './modules/exchange-rate/infrastructure/presentation/exchange-rate.module';

@Module({
  imports: [
    ExchangeRateModule,
    TerminusModule,
    AuthModule,
    ConfigModule.forRoot({ envFilePath: 'env' }),
  ],
  controllers: [HealthCheckController],
  providers: [AppService],
})
export class AppModule {}
