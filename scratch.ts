export interface Button {
	click(): void;
}

interface TextBox {
	input(): void;
}

abstract class GUIFactory {
	static getFactory(osType: string): GUIFactory {
		switch (osType) {
			case 'windows':
				return new WindowsGUIFactory();
			case 'mac':
				return new MacGUIFactory();
			default:
				throw new Error('Unknown OS Type');
		}
	}

	abstract createButton(): Button;
	abstract createTextBox(): TextBox;
}

class WindowsButton implements Button {
	click(): void {
		console.log('Clicked Windows Button');
	}
}

class WindowsTextBox implements TextBox {
	input(): void {
		console.log('Inputted Windows TextBox');
	}
}

class WindowsGUIFactory extends GUIFactory {
	createButton(): Button {
		const button = new WindowsButton();
		return button;
	}
	createTextBox(): TextBox {
		const textBox = new WindowsTextBox();
		return textBox;
	}
}

class MacButton implements Button {
	click(): void {
		console.log('Clicked Mac Button');
	}
}

class MacTextBox implements TextBox {
	input(): void {
		console.log('Inputted Mac TextBox');
	}
}

class MacGUIFactory extends GUIFactory {
	createButton(): Button {
		const button = new MacButton();
		return button;
	}
	createTextBox(): TextBox {
		const textBox = new MacTextBox();
		return textBox;
	}
}

const guiFactory = GUIFactory.getFactory('windows');
const button = guiFactory.createButton();
button.click();

const textBox = guiFactory.createTextBox();
textBox.input();
