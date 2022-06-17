import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
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
}
