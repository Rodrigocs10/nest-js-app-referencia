import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'body-parser';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    json({
      limit: '100mb',
    }),
  );

  app.enableCors();
  app.setGlobalPrefix('/api');

  // enable validation globally
  // this is from NestJS docs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // enable DI for class-validator
  // this is an important step, for further steps in this article
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  /* Create sswagger documentation */
  const options = new DocumentBuilder()
    .setTitle('Nibracon API')
    .setDescription('Nibracon API')
    .setVersion('1.0')
    .addTag('nibracon')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000, () => console.log(`Server started`));
}
bootstrap();
