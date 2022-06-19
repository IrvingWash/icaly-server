const urlWhitelist = [
	process.env.CLIENT_URL,
];

export function makeUrlWhitelist(): string[] {
	const urls: string[] = [];

	urlWhitelist.forEach((url) => {
		if (url !== undefined) {
			urls.push(url);
		}
	});

	return urls;
}
