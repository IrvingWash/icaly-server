import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';

import { CategoryModule } from './category/category.module';

config();

const dbUrl = process.env.DB_URL || '';

@Module({
	imports: [
		MongooseModule.forRoot(dbUrl),
		CategoryModule,
	],
})
export class AppModule {}
