let nPlayers = 0;
let nCells, cellSize;
let players = [], foods = [];
let foodChance, superFoodChance, superFoodPower;
let foodColor, superFoodColor;
let p1Color, p2Color;
let startLen, record;
let totalTime = 0, fps;
let introFade, intro = 0;
let menuBtn;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(32);

	// Create menu button
	menuBtn = new Button(20, 20, width/12, height/20, "Menu", goToMenu);
	menuBtn.visible = false;

	// Parameters
	introFade = 45;
	nCells = 16; // should be even
	cellSize = height/20;
	p1Color = color(227, 103, 86);
	p2Color = color(86, 210, 227);
	startLen = 4;
	record = startLen;
	foodChance = 0.08;
	superFoodChance = 0.005;
	superFoodPower = 5;
	foodColor = color(105, 227, 86);
	superFoodColor = color(227, 226, 86);
	fps = 6;

	// Start UI
	UI.tableWidth = 1;
	UI.tableHeight = 100;
	UI.distrubute();
}

function draw() {
	background(32);
	textStyle(NORMAL);
	UI.update();
	UI.draw();
	translate(width/2, height/2);
	if(nPlayers == 0) {
		frameRate(30);
		menuBtn.visible = false;
		drawStartMenu();
	} else {
		frameRate(fps);
		menuBtn.visible = true;
		gameLoop();
	}
}

function drawStartMenu() {
	rectMode(CENTER);
	textAlign(CENTER);
	textStyle(BOLD);
	noStroke();

	// Title
	textSize(2*cellSize);
	fill(200);
	text("Snake!!", 0, -height/2 + 3*cellSize);
	// Head
	rect(0, -height/2 + 4*cellSize + 20, cellSize*2, cellSize*2, cellSize/6);
	// Draw eyes
	stroke(32);
	strokeWeight(8);
	point(-cellSize/3, -height/2 + 4*cellSize + 20 - cellSize/3);
	point(cellSize/3, -height/2 + 4*cellSize + 20 - cellSize/3);
	// Record
	textSize(cellSize);
	text("Record: " + record.toString(), 0, height/2 - 3*cellSize);

	// One player option
	noStroke();
	if(mouseX <= width/2 && intro >= introFade) {
		push();
		rotate(PI/12);
		scale(1.15,1.15);
	}
	fill(p1Color);
	rect(-width/4, -cellSize*3 - 20, cellSize*2, cellSize*2, cellSize/6);
	rect(-width/4, -cellSize - 10, cellSize*2, cellSize*2, cellSize/6);
	rect(-width/4 - cellSize*2 - 10, -cellSize - 10, cellSize*2, cellSize*2, cellSize/6);
	rect(-width/4 + cellSize*2 + 10, -cellSize - 10, cellSize*2, cellSize*2, cellSize/6);
	fill(32);
	textSize(cellSize);
	text("W", -width/4, -cellSize*2.5 - 20);
	text("A", -width/4 - cellSize*2 - 10, -cellSize*0.5 - 10);
	text("S", -width/4, -cellSize*0.5 - 10);
	text("D", -width/4 + cellSize*2 + 10, -cellSize*0.5 - 10);
	fill(p1Color);
	textStyle(NORMAL);
	text("One player!", -width/4, + cellSize*0.5 + 20);

	// Two players option
	if(mouseX > width/2  && intro >= introFade){
		rotate(-PI/12);
		scale(1.15,1.15);
	} else if (intro >= introFade){
		pop();
	}
	fill(p2Color);
	rect(width/4, -cellSize*3 - 20, cellSize*2, cellSize*2, cellSize/6);
	rect(width/4, -cellSize - 10, cellSize*2, cellSize*2, cellSize/6);
	rect(width/4 - cellSize*2 - 10, -cellSize - 10, cellSize*2, cellSize*2, cellSize/6);
	rect(width/4 + cellSize*2 + 10, -cellSize - 10, cellSize*2, cellSize*2, cellSize/6);
	fill(32);
	textSize(cellSize);
	textStyle(BOLD);
	text("W", width/4, -cellSize*2.5 - 20);
	text("A", width/4 - cellSize*2 - 10, -cellSize*0.5 - 10);
	text("S", width/4, -cellSize*0.5 - 10);
	text("D", width/4 + cellSize*2 + 10, -cellSize*0.5 - 10);
	fill(p2Color);
	textStyle(NORMAL);
	text("Two players!", width/4, + cellSize*0.5 + 20);
	rotate(PI);
	fill(p2Color);
	rect(-width/4, -cellSize*4 - 40, cellSize*2, cellSize*2, cellSize/6);
	rect(-width/4, -cellSize*2 - 30, cellSize*2, cellSize*2, cellSize/6);
	rect(-width/4 - cellSize*2 - 10, -cellSize*2 - 30, cellSize*2, cellSize*2, cellSize/6);
	rect(-width/4 + cellSize*2 + 10, -cellSize*2 - 30, cellSize*2, cellSize*2, cellSize/6);
	fill(32);
	textSize(cellSize);
	textStyle(BOLD);
	text("I", -width/4, -cellSize*3.5 - 40);
	text("J", -width/4 - cellSize*2 - 10, -cellSize*1.5 - 30);
	text("K", -width/4, -cellSize*1.5 - 30);
	text("L", -width/4 + cellSize*2 + 10, -cellSize*1.5 - 30);
	
	// Check player input and choose players
	if(mouseIsPressed && intro >= introFade){
		if (mouseX <= width/2) {
			nPlayers = 1;
			players.push(new Snake(0));

		} else {
			nPlayers = 2;
			players.push(new Snake(0));
			players.push(new Snake(1));
		}
		totalTime = 0;
	}

	// Make intro animation
	if(intro < introFade) {
		background(32, 255*(1 - intro/introFade)**3);
		intro++;
	}
}

function gameLoop() {
	// Draw map boundaries
	rectMode(CORNER);
	textAlign(LEFT);
	strokeWeight(1);
	stroke(200);
	noFill();
	rect(-nCells/2 * cellSize, -nCells/2 * cellSize, nCells * cellSize, nCells * cellSize);

	// Update players
	for(let p of players) {
		p.update();
	}

	// Draw players
	noStroke();
	for(let p of players) {
		p.draw();
	}

	// Spawn and draw food
	spawnFood();
	drawFood();

	// Update record
	let biggest = nPlayers == 2 && players[1].getPoints() > players[0].getPoints() ?
	 			players[1].getPoints() : players[0].getPoints();
	record = biggest > record ? biggest : record; 

	// Draw points
	textSize(cellSize);
	fill(p1Color);
	text("Player1", nCells/2 * cellSize + cellSize, -nCells/2 * cellSize + cellSize);
	text(players[0].getPoints(), nCells/2 * cellSize + cellSize, -nCells/2 * cellSize + 2*cellSize + 10);
	
	fill(200);
	text("Record", nCells/2 * cellSize + cellSize, -cellSize/2 - 5);
	text(record, nCells/2 * cellSize + cellSize, cellSize/2 + 5);

	totalTime += deltaTime / 1000;
	textAlign(CENTER);
	text(("0" + floor(totalTime / 60).toString()).slice(-2) + ":" +
			("0" + (floor(totalTime) % 60).toString()).slice(-2),
			0, -nCells/2 * cellSize - 10)

	if(nPlayers == 2) {
		textAlign(LEFT);
		fill(p2Color);
		text("Player2", nCells/2 * cellSize + cellSize, nCells/2 * cellSize - cellSize - 10);
		text(players[1].getPoints(), nCells/2 * cellSize + cellSize, nCells/2 * cellSize);
	}
}

/**
 * Randomly spawns food in unOcupied cells
 */
function spawnFood() {
	if(random() < foodChance) {
		let p = createVector(floor(random(-nCells/2, nCells/2)), floor(random(-nCells/2, nCells/2)));
		while(isOcupied(p)) {
			p = createVector(floor(random(-nCells/2, nCells/2)), floor(random(-nCells/2, nCells/2)));
		}
		foods.push([p,1]);
	} else if(random() < superFoodChance) {
		let p = createVector(floor(random(-nCells/2, nCells/2)), floor(random(-nCells/2, nCells/2)));
		while(isOcupied(p)) {
			p = createVector(floor(random(-nCells/2, nCells/2)), floor(random(-nCells/2, nCells/2)));
		}
		foods.push([p,superFoodPower]);
	}
}

/**
 * Draws all the food in the map
 */
function drawFood() {
	noStroke();
	for(let f of foods) {
		fill(f[1] > 1 ? superFoodColor : foodColor);
		let r = f[1] > 1 ? cellSize/2 : cellSize/3;
		ellipse(f[0].x*cellSize + cellSize/2, f[0].y*cellSize + cellSize/2, r, r);
	}
}

/**
 * @param p 
 * 
 * @return true if position p is occupied by a player or other food
 */
function isOcupied(p) {
	for(let ply of players)
		for(let c of ply.cells)
			if(c.x == p.x && c.y == p.y)
				return true;
	for(let f of foods)
		if(f[0].x == p.x && f[0].y == p.y)
			return true;
	return false;
}

function goToMenu() {
	players = [];
	food = [];
	nPlayers = 0;
	intro = 0;
}

function mousePressed() {
	UI.mouseClicked();
}

function keyPressed() {
	switch(keyCode){
		case 87: // W
			players[0].changeDir(0);
			break;
		case 68: // D
			players[0].changeDir(1);
			break;
		case 83: // S
			players[0].changeDir(2);
			break;
		case 65: // A
			players[0].changeDir(3);
			break;
		
	}
	if(nPlayers == 2) {
		switch(keyCode){
			case 73: // I
				players[1].changeDir(0);
				break;
			case 76: // L
				players[1].changeDir(1);
				break;
			case 75: // K
				players[1].changeDir(2);
				break;
			case 74: // J
				players[1].changeDir(3);
				break;
			
		}
	}
}
