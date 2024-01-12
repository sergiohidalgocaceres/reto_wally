import { Module } from '@nestjs/common';

import { ExchangeRateApplication } from '../../application/exchange-rate.application';
import { ExchangeRateInfrastructure } from '../exchange-rate.infrastructure';
import { ExchangeRateEntity } from '../in-memory/exchange-rate.entity';
import { ExchangeRateController } from './exchange-rate.controller';

const controllers = [ExchangeRateController];
const infrastructure = [ExchangeRateInfrastructure, ExchangeRateEntity];
const application = [ExchangeRateApplication];

@Module({
  controllers: [...controllers],
  providers: [...infrastructure, ...application],
})
export class ExchangeRateModule {}
