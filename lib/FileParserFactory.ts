import { FileParser } from './FileParser';
import { UTF8FileParser } from './UTF8FileParser';

export class FileParserFactory {
	static getFileParserByEncoding(encoding: BufferEncoding, baseDir: string, relativePath: string): FileParser {
		switch (encoding) {
			case 'utf-8':
			case 'utf8':
				return new UTF8FileParser(baseDir, relativePath);
			default:
				throw new Error('Unknown FileParser content type: ' + encoding);
		}
	}
}
