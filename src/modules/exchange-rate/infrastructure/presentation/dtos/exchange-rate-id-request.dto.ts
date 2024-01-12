import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ExchangeRateIdRequestDto {
  @ApiProperty({
    type: 'string',
    example: '6ddd1c67-e5ef-42ee-bd49-3963dd89abdd',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}
