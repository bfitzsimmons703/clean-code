interface PaymentProvider {
	pay(): void;
}

class PayPal implements PaymentProvider {
	pay(): void {
		console.log('PAYING WITH PAYPAL');
	}
}

class Stripe implements PaymentProvider {
	pay(): void {
		console.log('PAYING WITH STRIPE');
	}
}

export class PaymentProcessor {
	paymentProvider!: PaymentProvider;

	constructor(paymentProvider: PaymentProvider) {
		this.paymentProvider = paymentProvider;
	}

	public setPaymentProvider(newProvider: PaymentProvider) {
		this.paymentProvider = newProvider;
	}

	public processPayment() {
		this.paymentProvider.pay();
	}
}

const processor = new PaymentProcessor(new PayPal());
processor.processPayment();

processor.setPaymentProvider(new Stripe());
processor.processPayment();
