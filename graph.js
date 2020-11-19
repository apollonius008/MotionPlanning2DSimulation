class EdgeWeight {
	constructor(dest, weight) {
		this.dest = dest;
		this.weight = weight;
	}
}

class ShortestPathDataStructure {
	constructor(distance, parentNode, inMst) {
		this.distanceSource = distance;
		this.parentNode = parentNode;
		this.inMst = inMst;
	}
}

class Graph {
	constructor() {
		this.noVertex = 0;
		this.adjList = new Map();
	}

	addVertex(v) {
		if (this.adjList.has(v)) {
			console.log("Vertex already present");
			console.log("Graph : ", this);
			console.log("Vertex : ", v);
			return;
		}

		this.noVertex += 1;
		this.adjList.set(v, []);
	}

	addEdge(src, dest, weight) {
		if (!this.adjList.has(src)) {
			console.log("Source not present in graph");
			console.log("Graph : ", this);
			console.log("source : ", src);
			return;
		}

		if (!this.adjList.has(dest)) {
			console.log("Destination not present in graph");
			console.log("Graph : ", this);
			console.log("Destination : ", dest);
			return;
		}

		this.adjList.get(src).push(new EdgeWeight(dest, weight));
	}

	addEdgeUndirected(v1, v2, weight) {
		if (!this.adjList.has(v1)) {
			console.log("Source not present in graph");
			console.log("Graph : ", this);
			console.log("source : ", v1);
			return;
		}

		if (!this.adjList.has(v2)) {
			console.log("Destination not present in graph");
			console.log("Graph : ", this);
			console.log("Destination : ", v2);
			return;
		}

		this.adjList.get(v1).push(new EdgeWeight(v2, weight));
		this.adjList.get(v2).push(new EdgeWeight(v1, weight));
	}

	dijkstraShortestPath(src, dest) {
		if (!this.adjList.has(src)) {
			console.log("Source not present in graph");
			console.log("Graph : ", this);
			console.log("source : ", src);
			return;
		}

		if (!this.adjList.has(dest)) {
			console.log("Destination not present in graph");
			console.log("Graph : ", this);
			console.log("Destination : ", dest);
			return;
		}

		let vertexInformation = new Map();
		for (let ver of this.adjList.keys()) {
			vertexInformation.set(ver, new ShortestPathDataStructure(Infinity, null, false));
		}

		let sourceData = vertexInformation.get(src);
		sourceData.distanceSource = 0;
		sourceData.inMst = true;

		let destData = vertexInformation.get(dest);

		let currentNode = src;
		let currentInformation = sourceData;

		while (!destData.inMst) {
			for (let ejwet of this.adjList.get(currentNode)) {
				let ejInfo = vertexInformation.get(ejwet.dest);
				if (!ejInfo.inMst) {
					this.relaxVertices(ejwet.dest, currentNode, ejInfo, currentInformation, ejwet.weight);
				}
			}

			let minDistanceVertex = null;
			let minDistance = -1;

			for (let vertex of this.adjList.keys()) {
				let info = vertexInformation.get(vertex);
				if (!info.inMst) {
					if (minDistance == -1 || minDistance > info.distanceSource) {
						minDistanceVertex = vertex;
						minDistance = info.distanceSource;
					}
				}
			}

			currentNode = minDistanceVertex;
			currentInformation = vertexInformation.get(currentNode);
			currentInformation.inMst = true;
		}

		if (currentInformation.distanceSource == Infinity) {
			console.log("No path found");
			return [];
		}

		let shortest_path = [currentNode];

		while (currentInformation.parentNode != null) {
			currentNode = currentInformation.parentNode;
			shortest_path.unshift(currentNode);
			currentInformation = vertexInformation.get(currentNode);
		}

		return shortest_path;

	}

	relaxVertices(v1, v2, v1Info, v2Info, edgeWeight) {
		if (v1Info.distanceSource > v2Info.distanceSource + edgeWeight) {
			v1Info.distanceSource = v2Info.distanceSource + edgeWeight;
			v1Info.parentNode = v2;
		}
	}

}
