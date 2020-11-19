//a data structure for storing a line segment
class LineSegment {

	constructor(startPoint, endPoint) {
		this.startPoint = startPoint;
		this.endPoint = endPoint;
	}

	//function to check whether two line segments intersects each other
	//Input LineSegment l1, l2. Output : boolean
	static getIntersectionPoint(l1, l2) {
		const a1 = l1.endPoint.y - l1.startPoint.y;
		const b1 = l1.startPoint.x - l1.endPoint.x;
		const c1 = - l1.startPoint.y * b1 - l1.startPoint.x * a1;

		const a2 = l2.endPoint.y - l2.startPoint.y;
		const b2 = l2.startPoint.x - l2.endPoint.x;
		const c2 = - l2.startPoint.y * b2 - l2.startPoint.x * a2;

		// It checks if two lines are parallel
		// If lines are parallel, then they cannot
		// intersect, hence returns false
		if (a2 * b1 - a1 * b2 == 0)
			return null;

		//If the lines are not parallel, so they intersec
		//Here we are computing their point of intersection
		const x = -(b1 * c2 - b2 * c1) / (a2 * b1 - a1 * b2);
		const y = -(a2 * c1 - a1 * c2) / (a2 * b1 - a1 * b2);
		const intersectionPoint = new Point(x, y);

		//Check if the point of intersection lies within the line segment
		const pointInL1 = l1.pointIsWithinLine(intersectionPoint);
		if (!pointInL1)
			return null;

		const pointInL2 = l2.pointIsWithinLine(intersectionPoint);
		if (!pointInL2)
			return null;

		return intersectionPoint;
	}

	//returns an unit vector which is from the startPoint to the endPoint
	getLineDirection() {
		return (new Point(this.endPoint.x - this.startPoint.x, this.endPoint.y - this.startPoint.y)).getUnitVector();
	}

	//returns the length of the line segment
	getLength() {
		return (new Point(this.endPoint.x - this.startPoint.x, this.endPoint.y - this.startPoint.y)).getMagnitude();
	}

	//checks if given point is within the line segment
	//Input : Point p; Output : boolean
	pointIsWithinLine(p) {
		const a1 = this.endPoint.y - this.startPoint.y;
		const b1 = -(this.endPoint.x - this.startPoint.x);
		const c1 = -this.startPoint.y * b1 - this.startPoint.x * a1;

		if (round(a1 * p.x + b1 * p.y + c1) != 0) {
			return false;
		}

		const lineDirection = this.getLineDirection();
		const lengthLineSegment = this.getLength();
		let distanceFromStart;

		if (lineDirection.y != 0) {
			distanceFromStart = (p.y - this.startPoint.y) / lineDirection.y;
		}
		else if (lineDirection.x != 0) {
			distanceFromStart = (p.x - this.startPoint.x) / lineDirection.x;
		}
		else {
			return false;
		}

		if (distanceFromStart >= 0 && distanceFromStart <= lengthLineSegment)
			return true;
		else
			return false;
	}
}
