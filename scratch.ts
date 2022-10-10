class User {
	private mediator: ChatMediator;
	private name: string;

	constructor(mediator: ChatMediator, name: string) {
		this.mediator = mediator;
		this.name = name;
		this.mediator.registerUser(this);
	}

	send(message: string) {
		this.mediator.broadcast(message, this);
	}

	receive(message: string) {
		console.log(`${this.name} received message '${message}'`);
	}
}

export interface ChatMediator {
	users: Set<User>;
	broadcast(message: string, from: User): void;
	registerUser(user: User): void;
}

class ChatMediatorImpl implements ChatMediator {
	users: Set<User> = new Set();

	broadcast(message: string, from: User): void {
		for (const user of this.users) {
			if (user !== from) {
				user.receive(message);
			}
		}
	}

	registerUser(user: User): void {
		this.users.add(user);
	}
}

{
	const mediator = new ChatMediatorImpl();

	const brian = new User(mediator, 'Brian');
	const jesse = new User(mediator, 'Jesse');
	const katie = new User(mediator, 'Katie');

	brian.send('Hi!');
	jesse.send('Hey back!');
	katie.send('Allo!');
}
