import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({
    type: 'string',
    required: true,
    example: 'user01@email.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: 'string',
    required: true,
    example: '123456',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
