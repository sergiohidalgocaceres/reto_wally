import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { ExchangeRateRepository } from '../domain/repositories/exchange-rate.repository';
import { Currency, ExchangeRate } from '../domain/roots/exchange-rate';
import { ExchangeRateInfrastructure } from '../infrastructure/exchange-rate.infrastructure';
import { ExchangeRateDto } from './dtos/exchange-rate-response.dto';

@Injectable()
export class ExchangeRateApplication {
  constructor(
    @Inject(ExchangeRateInfrastructure)
    private readonly repository: ExchangeRateRepository,
  ) {}

  async calculateExchangeRate(
    amount: number,
    originCurrency: Currency,
    destinationCurrency: Currency,
    date: Date,
  ) {
    const exchangeRateFound =
      await this.repository.findExchangeRateByDate(date);
    if (!exchangeRateFound)
      throw new BadRequestException('Exchange rate not found');

    return ExchangeRateDto.fromDomainToResponse(
      amount,
      originCurrency,
      destinationCurrency,
      exchangeRateFound,
    );
  }

  async findExchangeRateById(id: string) {
    return await this.repository.findExchangeRateById(id);
  }

  async getAllExchangeRates() {
    const domain = await this.repository.listExchangeRates();
    return ExchangeRateDto.fromDomainToResponseList(domain);
  }

  async createExchangeRate(exchangeRate: ExchangeRate) {
    const exchangeRateFound = await this.repository.findExchangeRateByDate(
      exchangeRate.properties.createdAt,
    );
    if (exchangeRateFound)
      throw new BadRequestException(
        `Exchange rate with date: ${exchangeRate.properties.createdAt.toISOString()} exists`,
      );

    return await this.repository.createExchangeRate(exchangeRate);
  }

  async updateExchangeRate(exchangeRate: ExchangeRate) {
    return await this.repository.updateExchangeRate(exchangeRate);
  }

  async deleteExchangeRate(exchangeRate: ExchangeRate) {
    return await this.repository.deleteExchangeRate(exchangeRate);
  }
}
