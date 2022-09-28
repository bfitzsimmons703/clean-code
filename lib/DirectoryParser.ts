import { readdirSync, statSync } from 'fs';
import path from 'path';

export class DirectoryParser {
	private baseDir: string;

	constructor(baseDir: string) {
		this.baseDir = baseDir;
	}

	getDirectoryFilepaths(directory: string = this.baseDir): string[] {
		const files: string[] = [];

		const filesInDirectory = readdirSync(directory);
		for (const file of filesInDirectory) {
			const absolutePath = path.join(directory, file);
			if (statSync(absolutePath).isDirectory()) {
				files.push(...this.getDirectoryFilepaths(absolutePath));
			} else {
				files.push(absolutePath.replace(this.baseDir, ''));
			}
		}

		return files;
	}
}
