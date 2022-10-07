// Command
export interface Command {
	do(): void;
	undo(): void;
}

class SwitchLightsCommand implements Command {
	private light: Light;

	constructor(light: Light) {
		this.light = light;
	}

	do(): void {
		this.light.switchLight();
	}

	undo(): void {
		this.light.switchLight();
	}
}

// Receivers
interface Light {
	isOn: boolean;
	switchLight(): void;
}

class FloorLamp implements Light {
	isOn: boolean = false;
	switchLight() {
		this.isOn = !this.isOn;
		console.log(`Floor Lamp is ${this.isOn ? 'on' : 'off'}`);
	}
}

class OverheadLight implements Light {
	isOn: boolean = false;
	switchLight() {
		this.isOn = !this.isOn;
		console.log(`Overhead Light is ${this.isOn ? 'on' : 'off'}`);
	}
}

// Invoker
abstract class Room {
	private command!: Command;

	protected setCommand(command: Command) {
		this.command = command;
	}

	public executeCommand() {
		this.command.do();
	}
}

class LivingRoom extends Room {
	constructor() {
		super();
		this.setCommand(new SwitchLightsCommand(new FloorLamp()));
	}
}

{
	const livingRoom = new LivingRoom();
	livingRoom.executeCommand();
}
