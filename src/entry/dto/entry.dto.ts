import { IsString, IsUrl } from "class-validator";

export class EntryDto {
	@IsString()
	public readonly title: string;

	@IsString()
	public readonly author: string;

	@IsString()
	public readonly releaseDate: string;

	@IsUrl()
	public readonly url: string;
}
