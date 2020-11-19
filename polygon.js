
class Polygon {

	constructor() {
		this.vertex = [];
	}

	addVertex(p) {
		this.vertex.push(p);
	}

	removeVertex() {
		this.vertex.pop();
	}

	clearAllVertex() {
		this.vertex = [];
	}

	copy(p) {
		this.clearAllVertex();
		for (let i = 0; i < p.vertex.length; i++) {
			this.addVertex(p.vertex[i]);
		}
	}

	//checks if a Point p is within the polygon or not
	pointIsInPolygon(p, screenWidth) {
		let horizontalLine = new LineSegment(p, new Point(screenWidth, p.y));
		let totalIntersections = 0;
		let edgeLineSegment;
		for (let i = 0; i < this.vertex.length; i++) {
			if (i == this.vertex.length - 1) {
				edgeLineSegment = new LineSegment(this.vertex[i], this.vertex[0]);
				if (edgeLineSegment.pointIsWithinLine(p)) {
					return true;
				}
				const intersectionPoint = LineSegment.getIntersectionPoint(horizontalLine, edgeLineSegment);

				if (intersectionPoint != null) {
					totalIntersections += 1;
				}
			}
			else {
				edgeLineSegment = new LineSegment(this.vertex[i], this.vertex[i + 1]);
				if (edgeLineSegment.pointIsWithinLine(p)) {
					return true;
				}
				const intersectionPoint = LineSegment.getIntersectionPoint(horizontalLine, edgeLineSegment);
				if (intersectionPoint != null) {
					totalIntersections += 1;
				}
			}
		}
		if (totalIntersections % 2 == 0)
			return false;
		else
			return true;

	}
}

function drawPolygon(pgon, pgon_color) {
	if (pgon.vertex.length < 3) {
		console.log("Polygon has less than 2 vertex.");
		console.log("Number of vertex : ", pgon.vertex.length);
		return;
	}

	fill(pgon_color);
	noStroke();
	beginShape();
	for (let i = 0; i < pgon.vertex.length; i++) {
		vertex(pgon.vertex[i].x, pgon.vertex[i].y);
	}
	endShape(CLOSE);
}


function createTemporaryPolygon(temporary_polygon) {
	if (true) {
		if (mode == EDIT_MODE) {
			temporary_polygon = new Polygon();
			temporary_polygon.addVertex(new Point(mouseX, mouseY));
			mode = INCOMPLETE_POLYGON;
			console.log("MODE : INCOMPLETE POLYGON MODE");
		}
		else if (mode == INCOMPLETE_POLYGON) {
			if (Point.getDistance(temporary_polygon.vertex[0], new Point(mouseX, mouseY)) < 5) {
				if (temporary_polygon.vertex.length >= 3) {
					let pol = new Polygon();
					pol.copy(temporary_polygon);
					polygons.push(pol);
					temporary_polygon = null;
					mode = EDIT_MODE;
					console.log("Polygon Complete");
					console.log("MODE : EDIT MODE");
				}
			}
			else {
				temporary_polygon.addVertex(new Point(mouseX, mouseY));
				console.log("New Point Added");
			}
		}
	}
	return temporary_polygon;
}

function drawTemporaryPolygon(temporary_polygon, temporary_polygon_color, temporary_polygon_point_color, temporary_polygon_temp_point_color) {
	if (mode == INCOMPLETE_POLYGON) {
		noStroke();
		fill(temporary_polygon_point_color);
		for (let i = 0; i < temporary_polygon.vertex.length; i++) {
			circle(temporary_polygon.vertex[i].x, temporary_polygon.vertex[i].y, 5);
		}
		strokeWeight(2);
		fill(temporary_polygon_temp_point_color);
		circle(mouseX, mouseY, 5);
		noStroke();
		if (temporary_polygon.vertex.length >= 2) {
			fill(temporary_polygon_color);
			beginShape();
			for (let i = 0; i < temporary_polygon.vertex.length; i++) {
				vertex(temporary_polygon.vertex[i].x, temporary_polygon.vertex[i].y);
			}
			vertex(mouseX, mouseY);
			endShape(CLOSE);
		}
	}
}
