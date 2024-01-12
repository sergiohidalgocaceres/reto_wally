import { RatesVO } from '../value-objects/rates.vo';
import { UUIDVO } from '../value-objects/uuid.vo';

export enum CurrencyEnum {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  ARS = 'ARS',
  BRL = 'BRL',
  PEN = 'PEN',
}

export type Currency = keyof typeof CurrencyEnum;
export type TExchangeRate = Record<Currency, number>;

export interface ExchangeRateEssentials {
  readonly id: string;
  readonly exchangeRate: TExchangeRate;
}

export interface ExchangeRateOptionals {
  readonly createdAt: Date;
  readonly updatedAt: Date | undefined;
  readonly deletedAt: Date | undefined;
}

export type ExchangeRateProperties = ExchangeRateEssentials &
  Partial<ExchangeRateOptionals>;
export type ExchangeRateUpdateProperties = Partial<
  Omit<ExchangeRateEssentials, 'id'>
>;

export class ExchangeRate {
  private readonly id: string;
  private exchangeRate: TExchangeRate;
  private readonly createdAt: Date;
  private updatedAt: Date | undefined;
  private deletedAt: Date | undefined;

  constructor(properties: ExchangeRateProperties) {
    UUIDVO.create(properties.id);
    RatesVO.create(properties.exchangeRate);

    Object.assign(this, properties);
    if (!properties.createdAt) this.createdAt = new Date();
  }

  get properties(): ExchangeRateProperties {
    return {
      id: this.id,
      exchangeRate: this.exchangeRate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  delete(): void {
    this.deletedAt = new Date();
  }

  update(properties: ExchangeRateUpdateProperties): void {
    Object.assign(this, properties);
    this.updatedAt = new Date();
  }
}
