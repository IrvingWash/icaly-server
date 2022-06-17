import { Controller, Get } from "@nestjs/common";

import { CategoryService } from "./category.service";
import { Category } from "./schema/category.schema";

@Controller('categories')
export class CategoryController {
	public constructor(
		private _categoryService: CategoryService
	) {}

	@Get()
	public async categories(): Promise<Category[]> {
		return await this._categoryService.categories();
	}
}
