import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { CurrencyEnum } from '../../../domain/roots/exchange-rate';

@ValidatorConstraint({ name: 'customDate', async: false })
export class CustomDateConstraint implements ValidatorConstraintInterface {
  validate(date: string, args: ValidationArguments) {
    const regex = /^\d{4}\/\d{2}\/\d{2}$/;
    return regex.test(date);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Format date must be "YYYY/mm/dd"';
  }
}

export class ExchangeRateRequestDto {
  @ApiProperty({
    type: 'number',
    required: true,
    example: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  amount: number;

  @ApiProperty({
    type: 'string',
    required: true,
    example: 'USD',
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(CurrencyEnum)
  from: CurrencyEnum;

  @ApiProperty({
    type: 'string',
    required: true,
    example: 'EUR',
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(CurrencyEnum)
  to: CurrencyEnum;

  @ApiProperty({
    type: 'string',
    required: true,
    example: '2024/01/11',
  })
  @IsNotEmpty()
  @Validate(CustomDateConstraint)
  date: string;
}
