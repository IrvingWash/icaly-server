import { Controller } from "@nestjs/common";

import { CategoryService } from "./category.service";

@Controller('category')
export class CategoryController {
	public constructor(
		private _categoryService: CategoryService
	) {}
}
