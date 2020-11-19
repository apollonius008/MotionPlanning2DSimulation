//a data structure for 2d point and vectors
class Point {
	//just pass numbers in place of x and y
	//do not try to be oversmart and pass something else
	//otherwise hell will break lose
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	//euclidean distance between two points
	//Input : Point p1, p2; Output : float distance
	static getDistance(p1, p2) {
		return ((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2) ** 0.5;
	}

	//euclidean distance of point from origin
	getMagnitude() {
		return Point.getDistance(new Point(0, 0), this);
	}

	//returns the unit vector of the point
	//Output : Point unitVector
	getUnitVector() {
		const dist = this.getMagnitude();
		const uX = this.x / dist;
		const uY = this.y / dist;

		return new Point(uX, uY);
	}

	getKey() {
		return Symbol.for(`pairKey[${this.x}:${this.y}]`);
	}
}
