import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";

import { CategoryNotFoundException } from "src/helpers/api-exceptions";
import { CategoryDto } from "./dto/category.dto";
import { Category, CategoryDocument } from "./schema/category.schema";

@Injectable()
export class CategoryService {
	public constructor(
		@InjectModel(Category.name)
		private _categoryModel: Model<CategoryDocument>,
	) {}

	public async categories(): Promise<Category[]> {
		const categories = await this._categoryModel.find();

		return categories;
	}

	public async category(title: string): Promise<Category> {
		const category = await this._categoryModel
			.findOne({ title: title })
			.populate('entries');

		if (category === null) {
			throw new CategoryNotFoundException;
		}

		return category;
	}

	public async createCategory(dto: CategoryDto): Promise<Category> {
		const newCategory = await this._categoryModel.create({ ...dto });

		return newCategory;
	}

	public async updateCategory(id: ObjectId, dto: CategoryDto): Promise<Category> {
		const updatedCategory = await this._categoryModel.findByIdAndUpdate(
			id,
			{ ...dto },
			{ new: true },
		);

		if (updatedCategory === null) {
			throw new CategoryNotFoundException;
		}

		return updatedCategory;
	}

	public async deleteCategory(id: ObjectId): Promise<void> {
		const deletedCategory = await this._categoryModel.findByIdAndDelete(id);

		if (deletedCategory === null) {
			throw new CategoryNotFoundException;
		}
	}
}
