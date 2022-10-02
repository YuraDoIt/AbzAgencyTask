import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const port = process.env.PORT;
  console.log(process.env.DATABASE_URL);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  app.useStaticAssets(join(__dirname, '../views'));
  app.setBaseViewsDir(join(__dirname, '../client'));
  app.setViewEngine('ejs');
  await app.listen(port);
}
bootstrap();
