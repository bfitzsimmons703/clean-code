export class A {
	getBool(): boolean {
		return true;
	}
}

class B extends A {
	getBool(): boolean {
		throw new Error('Not implemented');
	}
}

function f(arg: A) {
	arg.getBool();
}

const a = new A();
f(a); //okay

const b = new B();
f(b); //throws error!
