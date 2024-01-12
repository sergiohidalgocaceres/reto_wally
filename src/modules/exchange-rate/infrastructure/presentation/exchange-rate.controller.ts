import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  Version,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiGatewayTimeoutResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

import { AuthenticationGuard } from '../../../core/application/guards/authentication';
import {
  GenericError,
  ResponseDescription,
} from '../../../core/presentation/errors/error-generic';
import {
  ExchangeRateListResponseDto,
  ExchangeRateResponseDto,
} from '../../application/dtos/exchange-rate-response.dto';
import { ExchangeRateApplication } from '../../application/exchange-rate.application';
import { ExchangeRate } from '../../domain/roots/exchange-rate';
import { ExchangeRateCreateRequestDto } from './dtos/exchange-rate-create-request.dto';
import { ExchangeRateIdRequestDto } from './dtos/exchange-rate-id-request.dto';
import { ExchangeRateRequestDto } from './dtos/exchange-rate-request.dto';
import {
  ExchangeRateResponseIndex,
  ExchangeRateResponseIndexDto,
} from './dtos/exchange-rate-response-index.dto';
import { ExchangeRateUpdateRequestDto } from './dtos/exchange-rate-update-request.dto';

@ApiTags('Exchange Rate')
@Controller('exchange-rate')
export class ExchangeRateController {
  constructor(private readonly application: ExchangeRateApplication) {}

  @Get()
  @Version('1')
  @ApiBearerAuth('bearer')
  @ApiOperation({
    summary: 'List all exchange rates',
  })
  @ApiOkResponse({
    description: 'List of exchange rates',
    type: ExchangeRateListResponseDto,
    isArray: true,
  })
  @ApiBadRequestResponse({
    type: GenericError,
    description: ResponseDescription.BAD_REQUEST,
  })
  @ApiInternalServerErrorResponse({
    type: GenericError,
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  @ApiGatewayTimeoutResponse({
    type: GenericError,
    description: ResponseDescription.API_GATEWAY_TIMEOUT,
  })
  @ApiUnauthorizedResponse({
    type: GenericError,
    description: ResponseDescription.API_GATEWAY_TIMEOUT,
  })
  @ApiForbiddenResponse({
    type: GenericError,
    description: ResponseDescription.FORBIDDEN,
  })
  @ApiConflictResponse({
    type: GenericError,
    description: ResponseDescription.CONFLICT,
  })
  @UseGuards(AuthenticationGuard)
  async getAllExchangeRates() {
    return await this.application.getAllExchangeRates();
  }

  @Get('/calculate')
  @Version('1')
  @ApiBearerAuth('bearer')
  @ApiOperation({
    summary: 'Convert currency into another currency',
  })
  @ApiOkResponse({
    description: 'Convert currency into another currency',
    type: ExchangeRateResponseDto,
  })
  @ApiBadRequestResponse({
    type: GenericError,
    description: ResponseDescription.BAD_REQUEST,
  })
  @ApiInternalServerErrorResponse({
    type: GenericError,
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  @ApiGatewayTimeoutResponse({
    type: GenericError,
    description: ResponseDescription.API_GATEWAY_TIMEOUT,
  })
  @ApiUnauthorizedResponse({
    type: GenericError,
    description: ResponseDescription.API_GATEWAY_TIMEOUT,
  })
  @ApiForbiddenResponse({
    type: GenericError,
    description: ResponseDescription.FORBIDDEN,
  })
  @ApiConflictResponse({
    type: GenericError,
    description: ResponseDescription.CONFLICT,
  })
  @UseGuards(AuthenticationGuard)
  async calculateExchangeRate(@Query() query: ExchangeRateRequestDto) {
    const { amount, from, to, date } = query;
    return await this.application.calculateExchangeRate(
      amount,
      from,
      to,
      new Date(date),
    );
  }

  @Post()
  @Version('1')
  @ApiBearerAuth('bearer')
  @ApiOperation({
    summary: 'Create exchange rate',
  })
  @ApiCreatedResponse({
    description: 'Exchange rate created',
    type: ExchangeRateResponseIndex,
  })
  @ApiBadRequestResponse({
    type: GenericError,
    description: ResponseDescription.BAD_REQUEST,
  })
  @ApiInternalServerErrorResponse({
    type: GenericError,
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  @ApiGatewayTimeoutResponse({
    type: GenericError,
    description: ResponseDescription.API_GATEWAY_TIMEOUT,
  })
  @ApiUnauthorizedResponse({
    type: GenericError,
    description: ResponseDescription.API_GATEWAY_TIMEOUT,
  })
  @ApiForbiddenResponse({
    type: GenericError,
    description: ResponseDescription.FORBIDDEN,
  })
  @ApiConflictResponse({
    type: GenericError,
    description: ResponseDescription.CONFLICT,
  })
  @UseGuards(AuthenticationGuard)
  async createExchangeRate(@Body() body: ExchangeRateCreateRequestDto) {
    const { exchangeRate, date } = body;

    const exchangeRateInstance = new ExchangeRate({
      id: uuidv4(),
      exchangeRate: exchangeRate,
      createdAt: new Date(date),
    });

    return ExchangeRateResponseIndexDto.format(
      await this.application.createExchangeRate(exchangeRateInstance),
    );
  }

  @Delete('/:id')
  @Version('1')
  @ApiBearerAuth('bearer')
  @ApiOperation({
    summary: 'Delete exchange rate',
  })
  @ApiOkResponse({
    description: 'Exchange rate deleted',
    type: ExchangeRateResponseIndex,
  })
  @ApiBadRequestResponse({
    type: GenericError,
    description: ResponseDescription.BAD_REQUEST,
  })
  @ApiInternalServerErrorResponse({
    type: GenericError,
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  @ApiGatewayTimeoutResponse({
    type: GenericError,
    description: ResponseDescription.API_GATEWAY_TIMEOUT,
  })
  @ApiUnauthorizedResponse({
    type: GenericError,
    description: ResponseDescription.API_GATEWAY_TIMEOUT,
  })
  @ApiForbiddenResponse({
    type: GenericError,
    description: ResponseDescription.FORBIDDEN,
  })
  @ApiConflictResponse({
    type: GenericError,
    description: ResponseDescription.CONFLICT,
  })
  @UseGuards(AuthenticationGuard)
  async deleteExchangeRate(@Param() param: ExchangeRateIdRequestDto) {
    const { id } = param;
    const exchangeRateFound = await this.application.findExchangeRateById(id);

    if (!exchangeRateFound)
      throw new BadRequestException('Exchange rate not found');

    exchangeRateFound.delete();

    return ExchangeRateResponseIndexDto.format(
      await this.application.deleteExchangeRate(exchangeRateFound),
    );
  }

  @Put('/:id')
  @Version('1')
  @ApiBearerAuth('bearer')
  @ApiOperation({
    summary: 'Update exchange rate',
  })
  @ApiOkResponse({
    description: 'Exchange rate updated',
    type: ExchangeRateResponseIndex,
  })
  @ApiBadRequestResponse({
    type: GenericError,
    description: ResponseDescription.BAD_REQUEST,
  })
  @ApiInternalServerErrorResponse({
    type: GenericError,
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  @ApiGatewayTimeoutResponse({
    type: GenericError,
    description: ResponseDescription.API_GATEWAY_TIMEOUT,
  })
  @ApiUnauthorizedResponse({
    type: GenericError,
    description: ResponseDescription.API_GATEWAY_TIMEOUT,
  })
  @ApiForbiddenResponse({
    type: GenericError,
    description: ResponseDescription.FORBIDDEN,
  })
  @ApiConflictResponse({
    type: GenericError,
    description: ResponseDescription.CONFLICT,
  })
  @UseGuards(AuthenticationGuard)
  async updateExchangeRate(
    @Param() param: ExchangeRateIdRequestDto,
    @Body() body: ExchangeRateUpdateRequestDto,
  ) {
    const { id } = param;
    const { exchangeRate } = body;

    const exchangeRateFound = await this.application.findExchangeRateById(id);

    if (!exchangeRateFound) {
      throw new BadRequestException('Exchange rate not found');
    }

    exchangeRateFound.update({ exchangeRate });
    return ExchangeRateResponseIndexDto.format(
      await this.application.updateExchangeRate(exchangeRateFound),
    );
  }
}
