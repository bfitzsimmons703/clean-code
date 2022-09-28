import { UTF8FileParser } from './UTF8FileParser';

export enum FileParserContentType {
	UTF8,
}

export class FileParserFactory {
	static getFileParser(type: FileParserContentType, baseDir: string, relativePath: string) {
		switch (type) {
			case FileParserContentType.UTF8:
				return new UTF8FileParser(baseDir, relativePath);
			default:
				throw new Error('Unknown FileParser content type: ' + type);
		}
	}
}
