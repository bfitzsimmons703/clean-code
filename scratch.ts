interface PaymentProcessor {
	makePayment(): void;
	checkCreditCard(): void;
	refund(): void;
}

class Stripe implements PaymentProcessor {
	makePayment() {
		console.log('Making stripe payment');
	}

	checkCreditCard() {
		console.log('Checking stripe cc');
	}

	refund() {
		console.log('Refunding stripe card');
	}
}

class Paypal implements PaymentProcessor {
	makePayment() {
		console.log('Making paypal payment');
	}

	checkCreditCard() {
		console.log('Checking paypal cc');
	}

	refund() {
		console.log('Refunding paypal card');
	}
}

export class Store {
	paymentProcessor: PaymentProcessor;

	constructor(paymentProcessor: PaymentProcessor) {
		this.paymentProcessor = paymentProcessor;
	}

	makePayment() {
		this.paymentProcessor.makePayment();
	}

	checkCreditCard() {
		this.paymentProcessor.checkCreditCard();
	}

	refund() {
		this.paymentProcessor.refund();
	}
}

const paymentProcessor = Math.random() < 0.5 ? new Stripe() : new Paypal();
const store = new Store(paymentProcessor);
store.checkCreditCard();
store.refund();
