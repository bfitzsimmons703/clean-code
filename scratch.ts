interface Reader {
	read(): string;
}

class KeyboardReader implements Reader {
	read(): string {
		return 'Hey';
	}
}

interface Writer {
	write(s: string): void;
}

class ConsoleWriter implements Writer {
	write(s: string): void {
		console.log(s);
	}
}

export function copyChars(reader: Reader, writer: Writer) {
	const chars = reader.read();
	writer.write(chars);
}

copyChars(new KeyboardReader(), new ConsoleWriter());
