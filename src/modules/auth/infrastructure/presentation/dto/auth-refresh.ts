import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class AuthRefreshDto {
  @ApiProperty({
    type: 'string',
    required: true,
    example: 'b77f4b5d-47cb-44b2-9b67-15d1eb8b13fa',
  })
  @IsNotEmpty()
  @IsUUID()
  refreshToken: string;
}
