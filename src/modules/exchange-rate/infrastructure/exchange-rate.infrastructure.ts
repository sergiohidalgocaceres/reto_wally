import { Injectable } from '@nestjs/common';

import { ExchangeRateRepository } from '../domain/repositories/exchange-rate.repository';
import { ExchangeRate } from '../domain/roots/exchange-rate';
import { ExchangeRateDto } from './dtos/exchange-rate.dto';
import { ExchangeRateEntity, Props } from './in-memory/exchange-rate.entity';

@Injectable()
export class ExchangeRateInfrastructure implements ExchangeRateRepository {
  constructor(private readonly entity: ExchangeRateEntity) {}

  async findExchangeRateByDate(date: Date): Promise<ExchangeRate | undefined> {
    const data = await this.entity.findExchangeRateByDate(date);
    return data
      ? (ExchangeRateDto.fromDataToDomain(data) as ExchangeRate)
      : undefined;
  }

  async findExchangeRateById(id: string): Promise<ExchangeRate | undefined> {
    const data = await this.entity.findExchangeRateById(id);
    return data
      ? (ExchangeRateDto.fromDataToDomain(data) as ExchangeRate)
      : undefined;
  }

  async createExchangeRate(
    exchangeRate: ExchangeRate,
  ): Promise<number | undefined> {
    const data = ExchangeRateDto.fromDomainToData(exchangeRate) as Props;
    return await this.entity.createExchangeRate(data);
  }

  async updateExchangeRate(
    exchangeRate: ExchangeRate,
  ): Promise<number | undefined> {
    return await this.entity.updateExchangeRate(exchangeRate);
  }

  async deleteExchangeRate(
    exchangeRate: ExchangeRate,
  ): Promise<number | undefined> {
    return await this.entity.deleteExchangeRate(exchangeRate);
  }

  async listExchangeRates(): Promise<ExchangeRate[]> {
    const data = await this.entity.listExchangeRates();
    return ExchangeRateDto.fromDataToDomain(data) as ExchangeRate[];
  }
}
