interface EmployeeDatabase {
	paymentPosted(): boolean;
	get(employeeId: number): Employee;
	save(employee: Employee): void;
}

interface CheckWriter {
	writeCheck(amount: number): void;
	checkWasWritten(): boolean;
}

class Employee {
	calculatePayment(): number {
		//...
	}

	postPayment(payment: number): void {
		//...
	}
}

class Payroll {
	private employeeDB: EmployeeDatabase;
	private checkWriter: CheckWriter;

	constructor(employeeDB: EmployeeDatabase, checkWriter: CheckWriter) {
		this.employeeDB = employeeDB;
		this.checkWriter = checkWriter;
	}

	payEmployee() {
		const employee = this.employeeDB.get(5);
		const payment = employee.calculatePayment();
		this.checkWriter.writeCheck(payment);
		employee.postPayment(payment);
		this.employeeDB.save(employee);
	}
}

class MockEmployeeDB implements EmployeeDatabase {
	paymentPosted(): boolean {
		throw new Error('Method not implemented.');
	}
	get(employeeId: number): Employee {
		throw new Error('Method not implemented.');
	}
	save(employee: Employee): void {
		throw new Error('Method not implemented.');
	}
}

class MockCheckWriter implements CheckWriter {
	writeCheck(amount: number): void {
		throw new Error('Method not implemented.');
	}
	checkWasWritten(): boolean {
		throw new Error('Method not implemented.');
	}
}

test('Test Payroll writes check', () => {
	const employeeDB = new MockEmployeeDB();
	const checkWriter = new MockCheckWriter();

	const payroll = new Payroll(employeeDB, checkWriter);
	payroll.payEmployee();

	expect(checkWriter.checkWasWritten());
	expect(employeeDB.paymentPosted());
});
