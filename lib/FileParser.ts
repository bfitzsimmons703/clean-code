export abstract class FileParser {
	protected baseDir: string;
	protected relativePath: string;

	constructor(baseDir: string, relativePath: string) {
		this.baseDir = baseDir;
		this.relativePath = relativePath;
	}

	abstract getFileContents(): string;
	abstract getFileLines(): string[];
}
