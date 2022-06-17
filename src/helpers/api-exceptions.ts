import { HttpException, HttpStatus } from "@nestjs/common";

export class CategoryNotFoundException extends HttpException {
	public constructor() {
		super('Category not found', HttpStatus.BAD_REQUEST);
	}
}

export class EntryNotFoundException extends HttpException {
	public constructor() {
		super('Entry not found', HttpStatus.BAD_REQUEST);
	}
}
