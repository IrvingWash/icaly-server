import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";

import { Category, CategoryDocument } from "src/category/schema/category.schema";

import {
	CategoryNotFoundException,
	EntryNotFoundException,
} from "src/helpers/api-exceptions";

import { EntryDto } from "./dto/entry.dto";
import { Entry, EntryDocument } from "./schema/entry.schema";

@Injectable()
export class EntryService {
	public constructor(
		@InjectModel(Entry.name)
		private _entryModel: Model<EntryDocument>,
		@InjectModel(Category.name)
		private _categoryModel: Model<CategoryDocument>
	) {}

	public async entry(title: string): Promise<Entry> {
		const entry = await this._entryModel.findOne({ title }).populate('category');

		if (entry === null) {
			throw new EntryNotFoundException;
		}

		return entry;
	}

	public async createEntry(dto: EntryDto): Promise<Entry> {
		const {
			title,
			author,
			releaseDate,
			category,
		} = dto;

		const currentCategory = await this._categoryModel.findOne({ title: category });

		if (currentCategory === null) {
			throw new CategoryNotFoundException;
		}

		const newEntry = await this._entryModel.create({
			title,
			author,
			releaseDate,
			category: currentCategory._id,
		});

		if (newEntry === null) {
			throw new EntryNotFoundException;
		}

		currentCategory.entries.push(newEntry);

		await currentCategory.save();

		return newEntry;
	}

	public async updateEntry(id: ObjectId, dto: EntryDto): Promise<Entry> {
		const {
			title,
			author,
			releaseDate,
			category,
			url,
		} = dto;

		if (category === undefined) {
			return await this._performEntryUpdate(id, { title, author, releaseDate, url });
		}

		const currentCategory = await this._categoryModel.findOne({ title: category });

		if (currentCategory === null) {
			throw new CategoryNotFoundException;
		}

		if (currentCategory.title === category) {
			return await this._performEntryUpdate(id, { title, author, releaseDate, url });
		}

		return await this._performEntryUpdate(id, { title, author, releaseDate, url, category: currentCategory._id });
	}

	public async deleteEntry(id: ObjectId): Promise<void> {
		const deletedEntry = await this._entryModel.findByIdAndDelete(id);
		
		if (deletedEntry === null) {
			throw new EntryNotFoundException;
		}
	}

	private async _performEntryUpdate(id: ObjectId, data: Partial<EntryDto>): Promise<Entry> {
		const updatedEntry = await this._entryModel.findByIdAndUpdate(id, { ...data }, { new: true });

		if (updatedEntry === null) {
			throw new EntryNotFoundException;
		}

		return updatedEntry;
	}
}
