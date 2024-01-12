import { ExchangeRate } from '../roots/exchange-rate';

export interface ExchangeRateRepository {
  findExchangeRateByDate(date: Date): Promise<ExchangeRate | undefined>;
  findExchangeRateById(id: string): Promise<ExchangeRate | undefined>;
  createExchangeRate(exchangeRate: ExchangeRate): Promise<number | undefined>;
  updateExchangeRate(exchangeRate: ExchangeRate): Promise<number | undefined>;
  deleteExchangeRate(exchangeRate: ExchangeRate): Promise<number | undefined>;
  listExchangeRates(): Promise<ExchangeRate[]>;
}
