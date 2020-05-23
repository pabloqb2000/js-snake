class Snake {
    /**
     * 
     * @param n Number of the snake (0 for player 1 and 1 for player 2)
     */
    constructor(n) {
        this.n = n;
        this.cells = [];
        this.growing = 0;
        if(n == 0) {
            for(let i = -nCells/2; i < -nCells/2 + startLen; i++) {
                this.cells.push(createVector(i,-nCells/2));
            }
            this.dir = 1;
        } else {
            for(let i = nCells/2 - 1; i >= nCells/2 - startLen; i--) {
                this.cells.push(createVector(i,nCells/2 - 1));
            }
            this.dir = 3;
        }
    }

    /**
     * Move the snake
     */
    update() {
        // Add new position
        let h = this.head();
        switch(this.dir) {
            case 0:
                this.cells.push(createVector(h.x, this.mapMod(h.y-1)));
                break;
            case 1:
                this.cells.push(createVector(this.mapMod(h.x+1), h.y));
                break;
            case 2:
                this.cells.push(createVector(h.x, this.mapMod(h.y+1)));
                break;
            case 3:
                this.cells.push(createVector(this.mapMod(h.x-1), h.y));
                break;
        }

        // If snake is not growing remove last cell
        if(this.growing == 0) {
            this.cells.splice(0,1);
        } else {
            this.growing--;
        }

        // Eat in the new cell
        let nh = this.head(); // new head
            // Eat food
        for(let i = 0; i < foods.length; i++){
            if(foods[i][0].x == nh.x && foods[i][0].y == nh.y) {
                this.growing += foods[i][1];
                foods.splice(i,1);
                break;
            }
        }
            // Eat it self
        for(let i = this.cells.length - 2; i >= 0; i--){
            if(this.cells[i].x == nh.x && this.cells[i].y == nh.y){
                this.cells.splice(0,i+1);
                break;
            }
        }
            // Eat other snake
        if(nPlayers == 2) {
            let otherCells = players[this.n == 0 ? 1 : 0].cells;
            for(let i = otherCells.length - 2; i >= 0; i--){
                if(otherCells[i].x == nh.x && otherCells[i].y == nh.y){
                    otherCells.splice(0,i+1);
                    this.growing += floor(i+1/2);
                    break;
                }
            }
        }

        this.changed = false;
    }

    /**
     * If the given position if out of the map 
     * returns a new position on the other side of the map
     * 
     * @param p Position to calculate
     */
    mapMod(p) {
        if(p >= -nCells/2 && p < nCells/2) {
            return p;
        }else if(p <= -nCells/2) {
            return p + nCells;
        } else {
            return p - nCells;
        }
    }

    /**
     * Draw this snake
     */
    draw() {
        // Draw body
        fill(this.n == 0 ? p1Color : p2Color);
        noStroke();
        for(let v of this.cells) {
            rect(v.x*cellSize + 1, v.y*cellSize + 1, cellSize - 2, cellSize - 2, cellSize/12);
        }

        // Draw eyes
        stroke(32);
        strokeWeight(4);
        let v = this.head();
        point(v.x*cellSize + cellSize/3, v.y*cellSize + cellSize/3);
        point(v.x*cellSize + 2*cellSize/3, v.y*cellSize + cellSize/3);
    }

    /**
     * Changes the direction to the given one if it's a legal move
     * 
     * @param d 
     */
    changeDir(d) {
        if((d+2) % 4 != this.dir && !this.changed){
            this.dir = d;
            this.changed = true;
        }
    }

    /**
     * @return The position of the head
     */
    head() {
        return this.cells[this.cells.length - 1];
    }

    /**
     * @return the number of points this player has
     */
    getPoints() {
        return this.cells.length;
    }
}