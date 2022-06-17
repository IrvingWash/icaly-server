import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";

import { EntryNotFoundException } from "src/helpers/api-exceptions";
import { EntryDto } from "./dto/entry.dto";
import { Entry, EntryDocument } from "./schema/entry.schema";

@Injectable()
export class EntryService {
	public constructor(
		@InjectModel(Entry.name)
		private _entryModel: Model<EntryDocument>
	) {}

	public async entry(title: string): Promise<Entry> {
		const entry = await this._entryModel.findOne({ title });

		if (entry === null) {
			throw new EntryNotFoundException;
		}

		return entry;
	}

	public async createEntry(dto: EntryDto): Promise<Entry> {
		const newEntry = await this._entryModel.create({ ...dto });

		return newEntry;
	}

	public async updateEntry(id: ObjectId, dto: EntryDto): Promise<Entry> {
		const updatedEntry = await this._entryModel.findByIdAndUpdate(
			id,
			{ ...dto },
			{ new: true }
		);

		if (updatedEntry === null) {
			throw new EntryNotFoundException;
		}

		return updatedEntry;
	}

	public async deleteEntry(id: ObjectId): Promise<void> {
		const deletedEntry = await this._entryModel.findByIdAndDelete(id);
		
		if (deletedEntry === null) {
			throw new EntryNotFoundException;
		}
	}
}
