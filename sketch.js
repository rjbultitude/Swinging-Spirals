var circleArr = [];
var myCanvas;
var num = 130;
var twidth = 5;
var swing = 20;
var noiseStart = 0.1;
var numSpirals = 1;

function SpiralNode(xpos, ypos, radius, colour, amt) {
	this.xpos = xpos;
	this.ypos = ypos;
	this.radius = radius;
	this.amt = amt;
	this.colour = color(random(colour, 255), colour - 50, colour - 800, 255);
}

SpiralNode.prototype.paint = function() {
	fill(this.colour);
	noStroke();
	ellipse(this.xpos, this.ypos, this.radius, this.radius);
}

SpiralNode.prototype.update = function() {
	var prevXpos = this.xpos;
	var prevYpos = this.ypos;
	var prevRadius = this.radius;

	var angle = frameCount/50;

	this.xpos = prevXpos + sin(angle) * this.amt/swing;
	this.ypos = prevYpos + sin(angle) * this.amt/(swing/2);
}

function createSpiralArr(newOffset, newColourSeed, newRadAngle, newInnerRadius) {

	//Spiral logic
	var innerRadius = newInnerRadius || 20;
	var offset = newOffset || 10;
	var radius = 5;
	var rad = 0;
	var radAngle = newRadAngle || 10;
	//colour
	var colour = newColourSeed || 30;
		
	for (var i = 0; i < num; i++) {

		innerRadius += 2;
		radius += 0.2;
		rad = radians(i * radAngle);
		noiseStart += 0.1;
		colour = 30 + noise(noiseStart) * 200;

		var xpos = sin(rad) * innerRadius + (width/2);
		var ypos = cos(rad) * innerRadius + (height/2) - offset * i/4;
		var newSpiralNode = new SpiralNode(xpos, ypos, radius, colour, i);
		circleArr.push(newSpiralNode);
	}
}

//controls
var addBtn = document.getElementById('add');
var subBtn = document.getElementById('subtract');
var addSpiral = document.getElementById('add-spiral');
var subSpiral = document.getElementById('sub-spiral');

//add spiral
addSpiral.addEventListener('click', function() {
	createSpiralArr(random(20,30), random(50,100), random(12,24), random(10, 100));
	numSpirals += 1;
});

//remove spiral
subSpiral.addEventListener('click', function() {
	var segment = circleArr.length / num;
	circleArr.splice(segment - 1, num);
});

//increase swing
addBtn.addEventListener('click', function() {
	if (swing > 5) {
		swing -= 5;
	}
});

//decrease swing
subBtn.addEventListener('click', function() {
	if (swing < 300) {
		swing += 5;
	}
});

function setup() {
	myCanvas = createCanvas(800,600);
	myCanvas.parent('canvas-container');
	background(0,0,0);
	createSpiralArr();
}

function draw() {
	background(0, 0, 0);
	for (var i = 0; i < circleArr.length; i++) {
		circleArr[i].paint();
		circleArr[i].update();
	}
}