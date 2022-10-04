export interface Timer {
	setTimer(): void;
}

export interface Door {
	lock(): void;
	unlock(): void;
}

class TimedDoor implements Timer, Door {
	setTimer(): void {
		throw new Error('Method not implemented.');
	}
	lock(): void {
		throw new Error('Method not implemented.');
	}
	unlock(): void {
		throw new Error('Method not implemented.');
	}
}
