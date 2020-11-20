let canvas_panel;
let canvas;

let state = 'NORMAL STATE';
let EDIT_MODE = 0;
let INCOMPLETE_POLYGON = 1;
let mode;

let polygons = [];
let polygons_color;
let temporary_polygon = null;
let temporary_polygon_color;
let temporary_polygon_point_color;
let temporary_polygon_temp_point_color;

let visibileGraph;
let start_point = null;
let end_point = null;
let graphColor;

let shortest_path = null;
let pathColor;

function setup() {
	canvas_panel = document.getElementById('canvas-window');
	canvas = createCanvas(canvas_panel.clientWidth, canvas_panel.clientHeight);
	canvas.parent(canvas_panel);

	$("#done-btn").prop('disabled', true);
	$("#start-btn").prop('disabled', true);
	$("#end-btn").prop('disabled', true);
	$("#run-btn").prop('disabled', true);

	$("#create-btn").on('click', onCreateBtnClick);
	$("#done-btn").on('click', onDoneBtnClick);
	$("#start-btn").on('click', onStartBtnClick);
	$("#end-btn").on('click', onEndBtnClick);
	$("#run-btn").on('click', onRunBtnClick);


	polygon_color = color('rgb(30, 81, 143)');
	temporary_polygon_color = color('rgba(70, 196, 12, 100)');
	temporary_polygon_point_color = color('rgb(63, 163, 16)');
	temporary_polygon_temp_point_color = temporary_polygon_point_color;
	graphColor = color('rgb(109, 128, 158)');
	pathColor = color('rgb(209, 54, 72)')
}

function draw() {
	background(220);

	//draw all permanent polygon
	for (let i = 0; i < polygons.length; i++) {
		drawPolygon(polygons[i], polygon_color);
	}

	if (state == 'EDIT ENV STATE') {
		drawTemporaryPolygon(temporary_polygon, temporary_polygon_color, temporary_polygon_point_color, temporary_polygon_temp_point_color);
	}
	else if (state == 'CHOOSE START STATE' || state == 'CHOOSE END STATE') {
		drawTemporaryRobot();
	}
	else if (state == 'FINAL STATE') {
		visibileGraph.drawVisibilityGraph(graphColor);
	}

	//draw the starting position after it has been selected
	if (start_point != null) {
		fill(0, 0, 0);
		circle(start_point.x, start_point.y, 10);
	}

	//draw the ending position after it has been selected
	if (end_point != null) {
		fill(0, 0, 0);
		circle(end_point.x, end_point.y, 10);
	}

	if (shortest_path != null) {
		drawShortestPath(pathColor);
	}
}

function onCreateBtnClick() {
	$("#done-btn").prop('disabled', false);
	$("#create-btn").prop('disabled', true);
	state = 'EDIT ENV STATE';
	mode = EDIT_MODE;
}

function onDoneBtnClick() {
	$('#done-btn').prop('disabled', true);
	state = 'NORMAL STATE';
	visibileGraph = new VisibilityGraph(polygons);
	visibileGraph.generateVisibilityGraphNaive(width);
	$('#start-btn').prop('disabled', false);
}

function mouseClicked() {
	if ((mouseX >= 0 && mouseX < width) && (mouseY >= 0 && mouseY < height)) {
		if (state == 'EDIT ENV STATE') {
			temporary_polygon = createTemporaryPolygon(temporary_polygon);
		}
		else if (state == 'CHOOSE START STATE') {
			let mousePoint = new Point(mouseX, mouseY);
			for (let pol of polygons) {
				if (pol.pointIsInPolygon(mousePoint, width)) {
					return;
				}
			}
			start_point = mousePoint;
			state = 'NORMAL STATE';
			$('#end-btn').prop('disabled', false);
		}
		else if (state == 'CHOOSE END STATE') {
			let mousePoint = new Point(mouseX, mouseY);
			for (let pol of polygons) {
				if (pol.pointIsInPolygon(mousePoint, width)) {
					return;
				}
			}
			end_point = mousePoint;
			state = 'NORMAL STATE';
			$('#run-btn').prop('disabled', false);
		}
	}
}

function onStartBtnClick() {
	state = 'CHOOSE START STATE';
	$('#start-btn').prop('disabled', true);
}

function onEndBtnClick() {
	state = 'CHOOSE END STATE';
	$('#end-btn').prop('disabled', true);
}

function onRunBtnClick() {
	state = 'FINAL STATE';
	$('#run-btn').prop('disabled', true);
	visibileGraph.addSourceDestinationInGraph(start_point, end_point, width);
	shortest_path = visibileGraph.dijkstraShortestPath(start_point, end_point);
}

function drawTemporaryRobot() {
	if ((mouseX >= 0 && mouseX < width) && (mouseY >= 0 && mouseY < height)) {
		let mousePoint = new Point(mouseX, mouseY);
		for (let pol of polygons) {
			if (pol.pointIsInPolygon(mousePoint, width)) {
				fill(255, 0, 0);
				circle(mouseX, mouseY, 10);
				return;
			}
		}
		fill(0, 255, 0);
		circle(mouseX, mouseY, 10);
	}
}

function drawShortestPath(pathColor) {
	strokeWeight(4);
	stroke(pathColor);

	for (let i = 1; i < shortest_path.length; i++) {
		const p1 = shortest_path[i - 1];
		const p2 = shortest_path[i];
		line(p1.x, p1.y, p2.x, p2.y);
	}
}
