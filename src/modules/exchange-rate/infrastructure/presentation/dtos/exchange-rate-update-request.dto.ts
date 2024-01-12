import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';

import { Currency } from '../../../domain/roots/exchange-rate';
import { CustomObjectConstraint } from './exchange-rate-create-request.dto';

export class ExchangeRateUpdateRequestDto {
  @ApiProperty({
    type: 'object',
    required: true,
    example:
      '{"USD": 1,"EUR": 0.91,"GBP": 0.78,"ARS": 815.47,"BRL": 4.85,"PEN": 3.7}',
  })
  @IsNotEmpty()
  @Validate(CustomObjectConstraint<Currency>)
  exchangeRate: Record<Currency, number>;
}
