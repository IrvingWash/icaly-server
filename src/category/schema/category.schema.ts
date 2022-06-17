import {
	Prop,
	Schema,
	SchemaFactory,
} from "@nestjs/mongoose";
import mongoose from "mongoose";

import { Entry } from "src/entry/schema/entry.schema";

@Schema()
export class Category {
	@Prop({
		unique: true,
		required: true,
	})
	public title: string;

	@Prop({
		type: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Entry',
		}],
	})
	public entries: Entry[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
export type CategoryDocument = Category & mongoose.Document;
