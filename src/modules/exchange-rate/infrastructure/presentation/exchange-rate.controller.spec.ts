import { Test } from '@nestjs/testing';

import { ExchangeRateListResponseDto } from '../../application/dtos/exchange-rate-response.dto';
import { ExchangeRateApplication } from '../../application/exchange-rate.application';
import { ExchangeRateInfrastructure } from '../exchange-rate.infrastructure';
import { ExchangeRateEntity } from '../in-memory/exchange-rate.entity';
import { ExchangeRateController } from './exchange-rate.controller';

let mod: any;
let exchangeRateController: ExchangeRateController;
let exchangeRateApplication: ExchangeRateApplication;

describe('ExchangeRateController', () => {
  beforeEach(async () => {
    mod = await Test.createTestingModule({
      controllers: [ExchangeRateController],
      providers: [
        ExchangeRateInfrastructure,
        ExchangeRateEntity,
        ExchangeRateApplication,
      ],
    }).compile();
    exchangeRateController = mod.get(ExchangeRateController);
    exchangeRateApplication = mod.get(ExchangeRateApplication);
  });

  it('getAllExchangeRates', async () => {
    const exchangeRates = [
      {
        id: 'f60d2c33-e2b3-49ca-8702-4b33d079866c',
        exchangeRate: {
          USD: 1,
          EUR: 0.91,
          GBP: 0.78,
          ARS: 815.47,
          BRL: 4.85,
          PEN: 3.7,
        },
        createdAt: new Date('2024-01-13T05:00:00.000Z'),
      },
      {
        id: '6f308267-01c1-4e3a-a301-7ddc4e9b612e',
        exchangeRate: {
          USD: 1,
          EUR: 0.91,
          GBP: 0.78,
          ARS: 815.47,
          BRL: 4.85,
          PEN: 3.7,
        },
        createdAt: new Date('2024-01-12T05:00:00.000Z'),
      },
    ];
    jest
      .spyOn(exchangeRateApplication, 'getAllExchangeRates')
      .mockImplementation(() => Promise.resolve(exchangeRates));

    const result: ExchangeRateListResponseDto[] =
      (await exchangeRateController.getAllExchangeRates()) as ExchangeRateListResponseDto[];
    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('exchangeRate');
    expect(result[0]).toHaveProperty('createdAt');
    expect(result.length).toBe(2);
  });
});
