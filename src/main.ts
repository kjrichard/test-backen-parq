import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {

  const options = new DocumentBuilder()
		.setTitle('especificaciones API del proyecto prueba')
		.setDescription('Esta API define los recursos del backend')
		.setVersion('1.0')
		.addTag('Users', "User resources")
		.addBearerAuth(
			{ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
			'access-token',
		)
		.build();

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  SwaggerModule.setup('/docs', app, SwaggerModule.createDocument(app, options));

  await app.listen(3000);
  Logger.log(`Server is running ${ await app.getUrl() }`)
}
bootstrap();
