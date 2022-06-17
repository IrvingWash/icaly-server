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

import { CategoryService } from "./category.service";
import { CategoryDto } from "./dto/category.dto";
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

	@Get(':title')
	public async category(
		@Param('title')
		title: string
	): Promise<Category> {
		return await this._categoryService.category(title);
	}

	@Post()
	public async createCategory(
		@Body()
		dto: CategoryDto
	): Promise<Category> {
		return await this._categoryService.createCategory(dto);
	}

	@Patch(':id')
	public async updateCategory(
		@Param('id')
		id: ObjectId,
		@Body()
		dto: CategoryDto
	): Promise<Category> {
		return await this._categoryService.updateCategory(id, dto);
	}

	@Delete(':id')
	public async deleteCategory(
		@Param('id')
		id: ObjectId
	): Promise<void> {
		return await this._categoryService.deleteCategory(id);
	}
}
