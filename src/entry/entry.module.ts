import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Category, CategorySchema } from "src/category/schema/category.schema";
import { EntryController } from "./entry.controller";
import { EntryService } from "./entry.service";

import { Entry, EntrySchema } from "./schema/entry.schema";

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Entry.name,
				schema: EntrySchema,
			},
			{
				name: Category.name,
				schema: CategorySchema,
			},
		]),
	],
	providers: [EntryService],
	controllers: [EntryController],
})
export class EntryModule {}
