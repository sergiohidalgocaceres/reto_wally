import { BadRequestException } from '@nestjs/common';

import { Currency, TExchangeRate } from '../roots/exchange-rate';

export class RatesVO {
  private readonly value: TExchangeRate;

  private constructor(value: TExchangeRate) {
    this.value = value;
  }

  static create(exchangeRate: TExchangeRate): RatesVO {
    Object.keys(exchangeRate).forEach((key) => {
      if (exchangeRate[key as Currency] <= 0)
        throw new BadRequestException(
          `Invalid exchange rate ${key} = ${exchangeRate[key as Currency]}`,
        );
    });

    return new RatesVO(exchangeRate);
  }
  getValue(): TExchangeRate {
    return this.value;
  }
}
