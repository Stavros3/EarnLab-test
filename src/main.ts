import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { settings } from './shared/settings.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (settings.swagger) {
    const config = new DocumentBuilder()
      .setTitle('Blogspot example')
      .setDescription('The Blogspot API description')
      .setVersion('1.0')
      .addTag('Blogspot')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(3000);
}
bootstrap();
