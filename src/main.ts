import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';

import { AppModule } from './app.module';
import { makeUrlWhitelist } from './url-whitelist';

config();

async function bootstrap(): Promise<void> {
	const port = process.env.PORT || '';

	const app = await NestFactory.create(AppModule);

	app.enableCors({
		origin: makeUrlWhitelist(),
	});

	await app.listen(port);
}

bootstrap();
