import { ApiProperty } from '@nestjs/swagger';

export class ExchangeRateResponseIndex {
  @ApiProperty({
    type: 'number',
    example: 50,
  })
  position: number;
}

export class ExchangeRateResponseIndexDto {
  static format(position: number): ExchangeRateResponseIndex {
    const response = new ExchangeRateResponseIndex();
    response.position = position;
    return response;
  }
}
