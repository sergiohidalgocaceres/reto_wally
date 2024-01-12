import { ApiProperty } from '@nestjs/swagger';

import { ExchangeRate, TExchangeRate } from '../../domain/roots/exchange-rate';

export class ExchangeRateResponseDto {
  @ApiProperty({
    type: 'number',
    required: true,
    example: 50,
  })
  amount: number;

  @ApiProperty({
    type: 'string',
    required: true,
    example: 'USD',
  })
  originCurrency: string;

  @ApiProperty({
    type: 'number',
    required: true,
    example: 45.5,
  })
  amountWithExchangeRate: number;

  @ApiProperty({
    type: 'string',
    required: true,
    example: 'EUR',
  })
  destinationCurrency: string;

  @ApiProperty({
    type: 'number',
    required: true,
    example: 0.91,
  })
  exchangeRate: number;

  @ApiProperty({
    type: 'date',
    required: true,
    example: '2024-01-13T05:00:00.000Z',
  })
  date: Date;
}

export class ExchangeRateListResponseDto {
  @ApiProperty({
    type: 'string',
    required: true,
    example: '89727926-3bc3-4d6a-a191-650b76cd8256',
  })
  id: string;

  @ApiProperty({
    type: 'object',
    required: true,
    example:
      '{"USD": 1,"EUR": 0.91,"GBP": 0.78,"ARS": 815.47,"BRL": 4.85,"PEN": 3.7}',
  })
  exchangeRate: TExchangeRate;

  @ApiProperty({
    type: 'date',
    required: true,
    example: '2024-01-13T05:00:00.000Z',
  })
  createdAt: Date;
}

export class ExchangeRateDto {
  static fromDomainToResponse(
    amount: number,
    originCurrency: string,
    destinationCurrency: string,
    data: ExchangeRate,
  ): ExchangeRateResponseDto {
    const { exchangeRate, createdAt } = data.properties;
    const amountWithExchangeRate = (
      (amount / exchangeRate[originCurrency]) *
      exchangeRate[destinationCurrency]
    ).toFixed(2);

    const response = new ExchangeRateResponseDto();
    response.amount = amount;
    response.amountWithExchangeRate = Number(amountWithExchangeRate);
    response.originCurrency = originCurrency;
    response.destinationCurrency = destinationCurrency;
    response.exchangeRate = Number(
      (
        exchangeRate[destinationCurrency] / exchangeRate[originCurrency]
      ).toFixed(4),
    );
    response.date = createdAt;

    return response;
  }

  static fromDomainToResponseList(
    data: ExchangeRate | ExchangeRate[],
  ): ExchangeRateListResponseDto | ExchangeRateListResponseDto[] {
    if (Array.isArray(data)) {
      return data.map((item) =>
        ExchangeRateDto.fromDomainToResponseList(item),
      ) as ExchangeRateListResponseDto[];
    }

    const { id, exchangeRate: exchangeRateValue, createdAt } = data.properties;
    return {
      id,
      exchangeRate: exchangeRateValue,
      createdAt,
    };
  }
}
