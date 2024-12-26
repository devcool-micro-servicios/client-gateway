import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envsVars } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common';

async function bootstrap() {
  const logger = new Logger('Bootstrap - Gatway');

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new RpcCustomExceptionFilter());
  await app.listen(envsVars.port);
  logger.log(`Gateway is running on port ${envsVars.port}`);
}
bootstrap();
