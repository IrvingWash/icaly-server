import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

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
		]),
	],
	providers: [EntryService],
	controllers: [EntryController],
})
export class EntryModule {}
