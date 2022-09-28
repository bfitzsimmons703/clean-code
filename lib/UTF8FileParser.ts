import { readFileSync } from 'fs';
import { join } from 'path';
import { FileParser } from './FileParser';

export class UTF8FileParser extends FileParser {
	constructor(baseDir: string, relativePath: string) {
		super(baseDir, relativePath);
	}

	getFileContents(): string {
		return readFileSync(this.getAbsoluteFilepath(), 'utf8');
	}

	getFileLines(): string[] {
		return this.getFileContents().split('\n');
	}

	private getAbsoluteFilepath(): string {
		return join(this.baseDir, this.relativePath);
	}
}
