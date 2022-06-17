import {
	Prop,
	Schema,
	SchemaFactory,
} from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Category {
	@Prop({
		unique: true,
		required: true,
	})
	public title: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
export type CategoryDocument = Category & mongoose.Document;
