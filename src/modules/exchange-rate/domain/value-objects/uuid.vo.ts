import { BadRequestException } from '@nestjs/common';
import { validate } from 'uuid';

export class UUIDVO {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(value: string): UUIDVO {
    if (!validate(value)) throw new BadRequestException('Invalid uuid');
    return new UUIDVO(value);
  }

  getValue(): string {
    return this.value;
  }
}
