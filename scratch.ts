// Should only ever reach 1
let instanceCount = 0;

export class Singleton {
	// the single instance
	private static instance: Singleton | null = null;

	// private so nothing outside the class can instantiate it
	private constructor() {
		instanceCount++;
	}

	// "lazy instantiation". If the instance is never needed, it won't be created.
	public static getInstance(): Singleton {
		if (this.instance === null) {
			this.instance = new Singleton();
		}

		return this.instance;
	}
}

const instance1 = Singleton.getInstance();
console.log(instanceCount); // 1, since this is the first (and only) instance

const instance2 = Singleton.getInstance();
console.log(instanceCount); // still 1, since we already instantiated the class

const instance3 = Singleton.getInstance();
console.log(instanceCount); // still 1 again
