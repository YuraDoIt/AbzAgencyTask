import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const port = process.env.PORT;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  app.useStaticAssets(join(__dirname, '../public'));
  app.setBaseViewsDir(join(__dirname, '../views'));
  app.setViewEngine('ejs')

  console.log(Date.now())

  await app.listen(port);
}
bootstrap();
