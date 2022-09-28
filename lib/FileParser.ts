import { readFileSync } from 'fs';
import { join } from 'path';

export class FileParser {
	private baseDir: string;
	private relativePath: string;

	constructor(baseDir: string, relativePath: string) {
		this.baseDir = baseDir;
		this.relativePath = relativePath;
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
