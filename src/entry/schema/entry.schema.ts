import {
	Prop,
	Schema,
	SchemaFactory,
} from "@nestjs/mongoose";

import mongoose from "mongoose";

import { Category } from "src/category/schema/category.schema";

@Schema({ timestamps: true })
export class Entry {
	@Prop({ required: true })
	public title: string;

	@Prop()
	public author: string;

	@Prop()
	public releaseDate: string;

	@Prop()
	public url: string;

	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
	})
	public category: Category;
}

export const EntrySchema = SchemaFactory.createForClass(Entry);
export type EntryDocument = Entry & mongoose.Document;
