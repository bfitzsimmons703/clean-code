// Define what every robot has
class Robot {
	head!: string;
	torso!: string;
	legs!: string;
	arms!: string;
}

export interface RobotBuilder {
	buildHead(): void;
	buildTorso(): void;
	buildLegs(): void;
	buildArms(): void;
	getRobot(): Robot;
}

// Concrete builder class
class OldRobotBuilder implements RobotBuilder {
	private robot: Robot = new Robot();

	getRobot(): Robot {
		return this.robot;
	}

	buildHead(): void {
		this.robot.head = 'Old Head';
	}

	buildTorso(): void {
		this.robot.torso = 'Old Torso';
	}

	buildLegs(): void {
		this.robot.legs = 'Old Legs';
	}

	buildArms(): void {
		this.robot.arms = 'Old Arms';
	}
}

class RobotDirector {
	private builder: RobotBuilder;

	constructor(builder: RobotBuilder) {
		this.builder = builder;
	}

	getRobot(): Robot {
		return this.builder.getRobot();
	}

	public makeRobot() {
		this.builder.buildHead();
		this.builder.buildTorso();
		this.builder.buildLegs();
		this.builder.buildArms();
	}
}

const oldRobotBuilder = new OldRobotBuilder();
const director = new RobotDirector(oldRobotBuilder);
director.makeRobot();
console.log(director.getRobot());
