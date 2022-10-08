// The "Template" abstract class
export abstract class HouseBuilder {
	// Common methods
	public buildHouse() {
		this.buildFoundation();
		this.buildWalls();
		this.buildWindows();
		this.buildRoof();
	}

	public buildFoundation() {
		console.log('Building foundation');
	}

	abstract buildWalls(): void;
	abstract buildWindows(): void;
	abstract buildRoof(): void;
}

// Detailed implementations
class WoodenHouseBuilder extends HouseBuilder {
	buildWalls(): void {
		console.log('Building wooden walls');
	}
	buildWindows(): void {
		console.log('Building wooden windows');
	}
	buildRoof(): void {
		console.log('Building a wooden roof');
	}
}

class GlassHouseBuilder extends HouseBuilder {
	buildWalls(): void {
		console.log('Building glass walls');
	}
	buildWindows(): void {
		console.log('Building glass windows');
	}
	buildRoof(): void {
		console.log('Building a glass roof');
	}
}
