import {
	Prop,
	Schema,
	SchemaFactory,
} from "@nestjs/mongoose";

import mongoose from "mongoose";

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
}

export const EntrySchema = SchemaFactory.createForClass(Entry);
export type EntryDocument = Entry & mongoose.Document;
