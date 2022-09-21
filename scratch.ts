// Declare interfaces for each distinct product we have
export interface GPU {
	assemble(): void;
}

interface Monitor {
	assemble(): void;
}

abstract class Manufacturer {
	public assembleGPU(): GPU {
		const gpu = this.createGPU();
		gpu.assemble();
		return gpu;
	}

	public assembleMonitor(): GPU {
		const gpu = this.createGPU();
		gpu.assemble();
		return gpu;
	}

	public assembleBundle(): [GPU, Monitor] {
		return [this.assembleGPU(), this.assembleMonitor()];
	}

	abstract createGPU(): GPU;
	abstract createMonitor(): Monitor;
}

class NvidiaGPU implements GPU {
	assemble(): void {
		console.log(`Assembling Nvidia GUP`);
	}
}

class NvidiaMonitor implements Monitor {
	assemble(): void {
		console.log(`Assembling Nvidia Monitor`);
	}
}

class NvidiaManufacturer extends Manufacturer {
	createGPU(): GPU {
		return new NvidiaGPU();
	}

	createMonitor(): Monitor {
		return new NvidiaMonitor();
	}
}

class AsusGPU implements GPU {
	assemble(): void {
		console.log(`Assembling Asus GUP`);
	}
}

class AsusMonitor implements Monitor {
	assemble(): void {
		console.log(`Assembling Asus Monitor`);
	}
}

class AsusManufacturer extends Manufacturer {
	createGPU(): GPU {
		return new AsusGPU();
	}

	createMonitor(): Monitor {
		return new AsusMonitor();
	}
}

{
	const nvidia = new NvidiaManufacturer();
	console.log(nvidia.assembleBundle());
}
