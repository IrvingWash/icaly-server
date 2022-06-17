import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';

import { AppModule } from './app.module';

config();

async function bootstrap(): Promise<void> {
	const port = process.env.PORT || '';

	const app = await NestFactory.create(AppModule);

	await app.listen(port);
}

bootstrap();
