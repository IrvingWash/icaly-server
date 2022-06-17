import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from "@nestjs/common";

import { ObjectId } from "mongoose";

import { EntryDto } from "./dto/entry.dto";
import { EntryService } from "./entry.service";
import { Entry } from "./schema/entry.schema";

@Controller('entries')
export class EntryController {
	public constructor(
		private _entryService: EntryService
	) {}

	@Get(':title')
	public async entry(
		@Param('title')
		title: string
	): Promise<Entry> {
		return await this._entryService.entry(title);
	}

	@Post()
	public async createEntry(
		@Body()
		dto: EntryDto
	): Promise<Entry> {
		return await this._entryService.createEntry(dto);
	}

	@Patch(':id')
	public async updateEntry(
		@Param('id')
		id: ObjectId,
		@Body()
		dto: EntryDto,
	): Promise<Entry> {
		return await this._entryService.updateEntry(id, dto);
	}

	@Delete(':id')
	public async deleteEntry(
		@Param('id')
		id: ObjectId
	): Promise<void> {
		return await this._entryService.deleteEntry(id);
	}
}
