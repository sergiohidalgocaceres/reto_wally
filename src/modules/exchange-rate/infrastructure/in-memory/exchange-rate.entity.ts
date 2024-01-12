import { Injectable } from '@nestjs/common';

import { ExchangeRate, TExchangeRate } from '../../domain/roots/exchange-rate';

export interface Props {
  readonly id: string;
  exchangeRate: TExchangeRate;

  readonly createdAt: Date;
  updatedAt: Date | undefined;
  deletedAt: Date | undefined;
}

const recordsExchangeRates: Props[] = [
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
    updatedAt: undefined,
    deletedAt: undefined,
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
    updatedAt: undefined,
    deletedAt: undefined,
  },
  {
    id: '85bf4c27-9c89-4692-b1ff-fc05f2b5cba0',
    exchangeRate: {
      USD: 1,
      EUR: 0.9,
      GBP: 0.76,
      ARS: 801.35,
      BRL: 4.82,
      PEN: 3.72,
    },
    createdAt: new Date('2024-01-11T05:00:00.000Z'),
    updatedAt: undefined,
    deletedAt: undefined,
  },
  {
    id: 'e7d272fa-001d-475d-aeac-ea0c27da890c',
    exchangeRate: {
      USD: 1,
      EUR: 0.88,
      GBP: 0.73,
      ARS: 790.65,
      BRL: 4.86,
      PEN: 3.74,
    },
    createdAt: new Date('2024-01-10T05:00:00.000Z'),
    updatedAt: undefined,
    deletedAt: undefined,
  },
  {
    id: '6ddd1c67-e5ef-42ee-bd49-3963dd89abdd',
    exchangeRate: {
      USD: 1,
      EUR: 0.83,
      GBP: 0.77,
      ARS: 750.65,
      BRL: 4.81,
      PEN: 3.77,
    },
    createdAt: new Date('2024-01-09T05:00:00.000Z'),
    updatedAt: undefined,
    deletedAt: undefined,
  },
];

@Injectable()
export class ExchangeRateEntity {
  findExchangeRateByDate(date: Date): Promise<Props | undefined> {
    return Promise.resolve(
      recordsExchangeRates.find((exchangeRate) => {
        return (
          exchangeRate.createdAt.getDate() === date.getDate() &&
          exchangeRate.createdAt.getMonth() === date.getMonth() &&
          exchangeRate.createdAt.getFullYear() === date.getFullYear() &&
          !exchangeRate.deletedAt
        );
      }),
    );
  }

  findExchangeRateById(id: string): Promise<Props | undefined> {
    return Promise.resolve(
      recordsExchangeRates.find((exchangeRate) => {
        return exchangeRate.id === id && !exchangeRate.deletedAt;
      }),
    );
  }

  createExchangeRate(props: Props): Promise<number | undefined> {
    const recordMatched = recordsExchangeRates.find((exchangeRate) => {
      return (
        exchangeRate.createdAt.getDate() === props.createdAt.getDate() &&
        exchangeRate.createdAt.getMonth() === props.createdAt.getMonth() &&
        exchangeRate.createdAt.getFullYear() ===
          props.createdAt.getFullYear() &&
        !exchangeRate.deletedAt
      );
    });

    if (recordMatched) return Promise.resolve(undefined);

    return Promise.resolve(recordsExchangeRates.push(props));
  }

  updateExchangeRate(exchangeRate: ExchangeRate): Promise<number | undefined> {
    const positionRecordMatched = recordsExchangeRates.findIndex((el) => {
      return (
        el.id === exchangeRate.properties.id &&
        !exchangeRate.properties.deletedAt
      );
    });

    if (positionRecordMatched >= 0) {
      recordsExchangeRates[positionRecordMatched] =
        exchangeRate.properties as Props;
      return Promise.resolve(positionRecordMatched);
    }

    return Promise.resolve(undefined);
  }

  deleteExchangeRate(exchangeRate: ExchangeRate): Promise<number | undefined> {
    const positionRecordMatched = recordsExchangeRates.findIndex((el) => {
      return el.id === exchangeRate.properties.id;
    });

    if (positionRecordMatched >= 0) {
      recordsExchangeRates[positionRecordMatched] =
        exchangeRate.properties as Props;
      return Promise.resolve(positionRecordMatched);
    }

    return Promise.resolve(undefined);
  }

  listExchangeRates(): Promise<Props[]> {
    return Promise.resolve(
      recordsExchangeRates
        .filter((exchangeRate) => {
          return !exchangeRate.deletedAt;
        })
        .sort((a, b) => {
          return a.createdAt.getTime() - b.createdAt.getTime();
        }),
    );
  }
}
