class VisibilityGraph extends Graph {

	constructor(polygon_list) {
		super();
		this.polygon_list = polygon_list;
		this.generateLineSegmentInPolygons();
	}

	generateVisibilityGraphNaive(screenWidth) {
		const all_vertex = [];
		for (let i = 0; i < this.polygon_list.length; i++) {
			const pgon = this.polygon_list[i];
			for (let j = 0; j < pgon.vertex.length; j++) {
				this.addVertex(pgon.vertex[j]);
				all_vertex.push(pgon.vertex[j]);
			}
		}

		for (let i = 0; i < all_vertex.length - 1; i++) {
			for (let j = i + 1; j < all_vertex.length; j++) {
				const p1 = all_vertex[i];
				const p2 = all_vertex[j];

				if (this.isPointVisibleNaive(p1, p2, screenWidth)) {
					this.addEdgeUndirected(p1, p2, Point.getDistance(p1, p2));
				}
			}
		}

		for (let edges of this.polygonEdgeLines) {
			this.addEdgeUndirected(edges.startPoint, edges.endPoint, edges.getLength());
		}

	}

	addSourceDestinationInGraph(src, dest, screenWidth) {
		this.addVertex(src);
		this.addVertex(dest);

		for (let polygon of this.polygon_list) {
			for (let vertex of polygon.vertex) {
				if (this.isPointVisibleNaive(src, vertex, screenWidth)) {
					this.addEdgeUndirected(src, vertex, Point.getDistance(src, vertex));
				}

				if (this.isPointVisibleNaive(dest, vertex, screenWidth)) {
					this.addEdgeUndirected(dest, vertex, Point.getDistance(dest, vertex));
				}
			}
		}

		if (this.isPointVisibleNaive(src, dest, screenWidth)) {
			this.addEdgeUndirected(src, dest, Point.getDistance(src, dest));
		}
	}

	//returns true if the point p1 is visible from p2
	isPointVisibleNaive(p1, p2, screenWidth) {
		let currentLine = new LineSegment(p1, p2);
		let intersectionPoint;
		//loops through all the edges to check if
		//currentLine intersects with any of them
		for (let i = 0; i < this.polygonEdgeLines.length; i++) {
			intersectionPoint = LineSegment.getIntersectionPoint(currentLine, this.polygonEdgeLines[i]);
			if (intersectionPoint != null) {
				if (!(_.isEqual(intersectionPoint, p1) || _.isEqual(intersectionPoint, p2))) {
					return false;
				}
			}
		}

		const midPoint = new Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
		for (let i = 0; i < this.polygon_list.length; i++) {
			if (this.polygon_list[i].pointIsInPolygon(midPoint, screenWidth)) {
				return false;
			}
		}

		return true;
	}

	generateLineSegmentInPolygons() {
		this.polygonEdgeLines = [];
		for (let i = 0; i < this.polygon_list.length; i++) {
			let pgon = this.polygon_list[i];
			for (let j = 0; j < pgon.vertex.length; j++) {
				if (j == pgon.vertex.length - 1) {
					this.polygonEdgeLines.push(new LineSegment(pgon.vertex[j], pgon.vertex[0]));
				}
				else {
					this.polygonEdgeLines.push(new LineSegment(pgon.vertex[j], pgon.vertex[j + 1]));
				}
			}
		}
	}

	drawVisibilityGraph(graphColor) {
		strokeWeight(2);
		stroke(graphColor);
		for (let entry of this.adjList.entries()) {
			const p1 = entry[0];
			for (let destNode of entry[1]) {
				const p2 = destNode.dest;
				line(p1.x, p1.y, p2.x, p2.y);
			}
		}
	}
}
