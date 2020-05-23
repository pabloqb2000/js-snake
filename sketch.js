let nPlayers;
let nCells, cellSize;
let players = [], foods = [];
let foodChance, superFoodChance, superFoodPower;
let foodColor, superFoodColor;
let p1Color, p2Color;
let startLen, record;
let totalTime = 0;

function setup() {
	nPlayers = 0;
	createCanvas(windowWidth, windowHeight);
	background(32);

	// Parameters
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
	frameRate(6);
}

function draw() {
	background(32);
	translate(width/2, height/2);
	if(nPlayers == 0) {
		drawStartMenu();
	} else {
		gameLoop();
	}
}

function drawStartMenu() {
	nPlayers = 2;
	players.push(new Snake(0));
	players.push(new Snake(1));
}

function gameLoop() {
	// Draw map boundaries
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
