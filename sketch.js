let canvas_panel;
let canvas;

function setup() {
	canvas_panel = document.getElementById('canvas-window');
	canvas = createCanvas(canvas_panel.clientWidth, canvas_panel.clientHeight);
	canvas.parent(canvas_panel);
}

function draw() {
	background(220);
}
