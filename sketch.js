const circleArr = [];
let myCanvas;
const num = 130;
let swing = 20;
let noiseStart = 0.1;
let numSpirals = 1;

class SpiralNode {
	constructor(xpos, ypos, radius, colour, amt) {
		this.xpos = xpos;
		this.ypos = ypos;
		this.radius = radius;
		this.amt = amt;
		this.colour = color(random(colour, 255), colour - 50, colour - 800, 255);
	}

	paint() {
		fill(this.colour);
		noStroke();
		ellipse(this.xpos, this.ypos, this.radius, this.radius);
	}

	update() {
		const prevXpos = this.xpos;
		const prevYpos = this.ypos;

		const angle = frameCount/50;

		this.xpos = prevXpos + sin(angle) * this.amt/swing;
		this.ypos = prevYpos + sin(angle) * this.amt/(swing/2);
	}
}

function createSpiralArr(newOffset, newColourSeed, newRadAngle, newInnerRadius) {

	//Spiral logic
	let innerRadius = newInnerRadius || 20;
	const offset = newOffset || 10;
	let radius = 5;
	let rad = 0;
	const radAngle = newRadAngle || 10;
	//colour
	let colour = newColourSeed || 30;

	for (let i = 0; i < num; i++) {

		innerRadius += 2;
		radius += 0.2;
		rad = radians(i * radAngle);
		noiseStart += 0.1;
		colour = 30 + noise(noiseStart) * 200;

		const xpos = sin(rad) * innerRadius + (width/2);
		const ypos = cos(rad) * innerRadius + (height/2) - offset * i/4;
		const newSpiralNode = new SpiralNode(xpos, ypos, radius, colour, i);
		circleArr.push(newSpiralNode);
	}
}

//controls
const addBtn = document.getElementById('add');
const subBtn = document.getElementById('subtract');
const addSpiral = document.getElementById('add-spiral');
const subSpiral = document.getElementById('sub-spiral');

//add spiral
addSpiral.addEventListener('click', function() {
	createSpiralArr(random(20,30), random(50,100), random(12,24), random(10, 100));
	numSpirals += 1;
});

//remove spiral
subSpiral.addEventListener('click', function() {
	const segment = circleArr.length / num;
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
  for (let i = 0; i < circleArr.length; i++) {
    circleArr[i].paint();
    circleArr[i].update();
  }
}


