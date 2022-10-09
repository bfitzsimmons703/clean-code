interface Connection {
	insert(s: string): void;
}

export class DB {
	connection!: Connection;

	init() {}

	insertProducts() {
		this.connection.insert('...');
	}
}
