import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.use(helmet());
  app.use(compression({ encodings: ['gzip', 'deflate'] }));

  app.enableCors({ origin: '*' });

  const config = new DocumentBuilder()
    .setTitle('Wally')
    .setDescription('API created for the challenge of Wally')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Input your JWT token',
      name: 'Access Token',
      in: 'header',
    })
    .setVersion('1.0');

  const documentBuild = config.build();
  const document = SwaggerModule.createDocument(app, documentBuild, {
    operationIdFactory: (controlKey: string, methodKey: string) => methodKey,
  });
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      cors: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      security: [{ bearer: [] }],
    },
  });

  const port = AppService.port;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(port);
}
bootstrap();
