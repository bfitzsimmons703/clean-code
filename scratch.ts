export interface NamedCreature {
	name: string;
	printName: () => void;
}

class Puppy implements NamedCreature {
	name: string = 'Puppy';
	printName() {
		console.log(this.name);
	}
}

const pup = new Puppy();
pup.printName();
