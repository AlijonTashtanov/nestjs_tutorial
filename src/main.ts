import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Users auth')
  .setDescription('The users API description')
  .setVersion('1.0')
  .addTag('users')
  .build();
const documentFactory = () => SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api-docs', app, documentFactory);
  const port = process.env.PORT || 3000; // Fallback to 3000 if PORT is undefined or empty

  try {
    await app.listen(port);
    console.log(`Server is running on http://localhost:${port}`);
  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
  }
}
bootstrap();
