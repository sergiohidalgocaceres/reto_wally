import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { Currency } from '../../../../../modules/exchange-rate/domain/roots/exchange-rate';
import { CurrencyEnum } from '../../../domain/roots/exchange-rate';
import { CustomDateConstraint } from './exchange-rate-request.dto';

@ValidatorConstraint({ name: 'customCurrency', async: false })
export class CustomObjectConstraint<T extends string>
  implements ValidatorConstraintInterface
{
  validate(record: Record<T, number>, args: ValidationArguments) {
    let errorMatched = false;
    Object.keys(record).forEach((key) => {
      if (!CurrencyEnum[key]) errorMatched = true;
      if (typeof record[key] !== 'number') errorMatched = true;
      if (typeof record[key] === 'number' && record[key] <= 0)
        errorMatched = true;
    });
    return !errorMatched;
  }

  defaultMessage(args: ValidationArguments) {
    return `Currency must be a valid currency: ${Object.values(
      CurrencyEnum,
    )} and its values must be numbers and greater or equal than one.`;
  }
}

export class ExchangeRateCreateRequestDto {
  @ApiProperty({
    type: 'object',
    required: true,
    example:
      '{"USD": 1,"EUR": 0.91,"GBP": 0.78,"ARS": 815.47,"BRL": 4.85,"PEN": 3.7}',
  })
  @IsNotEmpty()
  @Validate(CustomObjectConstraint<Currency>)
  exchangeRate: Record<Currency, number>;

  @ApiProperty({
    type: 'date',
    required: true,
    example: '2024/01/14',
  })
  @IsNotEmpty()
  @Validate(CustomDateConstraint)
  date: string;
}
