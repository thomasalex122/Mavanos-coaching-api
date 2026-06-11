import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ennabling CORS for all origins, you can customize this as needed
  app.enableCors();
  // 2. Add this line: This enforces your DTO rules globally!
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); 

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
