export interface ExportShapeVisitor {
	visitCircle(c: Circle): void;
	visitSquare(s: Square): void;
	visitTriangle(t: Triangle): void;
}

// Concretions
class JSONExportShapeVisitor implements ExportShapeVisitor {
	visitCircle(c: Circle): void {
		console.log(`Exporting JSON circle`, c);
	}
	visitSquare(s: Square): void {
		console.log(`Exporting JSON square`, s);
	}
	visitTriangle(t: Triangle): void {
		console.log(`Exporting JSON triangle`, t);
	}
}

class XMLExportShapeVisitor implements ExportShapeVisitor {
	visitCircle(c: Circle): void {
		console.log(`Exporting XML circle`, c);
	}
	visitSquare(s: Square): void {
		console.log(`Exporting XML square`, s);
	}
	visitTriangle(t: Triangle): void {
		console.log(`Exporting XML triangle`, t);
	}
}

// Double Dispatch method
interface VisitedElement {
	accept(v: ExportShapeVisitor): void;
}

interface Shape {
	name: string;
}

class Circle implements Shape, VisitedElement {
	name: string = 'Circle';

	accept(v: ExportShapeVisitor): void {
		v.visitCircle(this);
	}
}

class Square implements Shape, VisitedElement {
	name: string = 'Square';

	accept(v: ExportShapeVisitor): void {
		v.visitSquare(this);
	}
}

class Triangle implements Shape, VisitedElement {
	name: string = 'Triangle';

	accept(v: ExportShapeVisitor): void {
		v.visitTriangle(this);
	}
}

{
	const jsonExporter = new JSONExportShapeVisitor();
	const xmlExporter = new XMLExportShapeVisitor();
	const visitedShapes: VisitedElement[] = [new Circle(), new Square(), new Triangle()];

	for (const shape of visitedShapes) {
		shape.accept(jsonExporter);
		shape.accept(xmlExporter);
	}
}
