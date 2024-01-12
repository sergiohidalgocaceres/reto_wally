import { ExchangeRate } from '../../domain/roots/exchange-rate';
import { Props } from '../in-memory/exchange-rate.entity';

export class ExchangeRateDto {
  static fromDataToDomain(
    data: Props | Props[],
  ): ExchangeRate | ExchangeRate[] {
    if (Array.isArray(data)) {
      return data.map((item) =>
        ExchangeRateDto.fromDataToDomain(item),
      ) as ExchangeRate[];
    }
    return new ExchangeRate(data);
  }

  static fromDomainToData(
    domain: ExchangeRate | ExchangeRate[],
  ): Props | Props[] {
    if (Array.isArray(domain)) {
      return domain.map((item) =>
        ExchangeRateDto.fromDomainToData(item),
      ) as Props[];
    }
    return {
      id: domain.properties.id,
      exchangeRate: domain.properties.exchangeRate,
      createdAt: domain.properties.createdAt,
      updatedAt: domain.properties.updatedAt,
      deletedAt: domain.properties.deletedAt,
    };
  }
}
