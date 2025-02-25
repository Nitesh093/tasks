import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  config();
  
  const app = await NestFactory.create(AppModule);
  await app.listen(8080);
}
bootstrap();
