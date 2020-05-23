let sld;
let btn;
let tggl;
let cPicker;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(32);

	// Create UI elements
	sld = new Slider(start=0, end=255, value=32, 0, 0, width/12, height/60, null, "Background");
	btn = new Button(x=0, y=0, width/12, height/30, "Reset", resetValue);
	
	tggl = new ToggleButton(0,0,width/12,height/30,"Discrete", discretice);
	cPicker = new ColorPicker(0,0, width/12, height/60);

	// Start UI
	UI.tableWidth = 1;
	UI.tableHeight = 100;
	UI.distrubute();
}

function draw() {
	// Draw UI
	background(sld.value);
	UI.update();
	UI.draw();

	
	translate(width/2 + width/12, height/2);
	scale(1,-1);
}

function resetValue() {
	sld.value = 32;
}

function discretice() {
	sld.step = (sld.step == null ? 20 : null);
}

function mouseDragged() {
	UI.mouseDragged();
}

function mousePressed() {
	UI.mouseClicked();
}

// function keyPressed() {
//   if(keyCode === 83){
//
//   }
// }
