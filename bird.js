class Bird {
	constructor(x, y, s, r) {
		this.x = x; // x position
		this.y = y; // y position
		this.s = s; // speed
		this.r = r; // radius
	}

	get xPos() {
		return this.x;
	}
	set xPos(x) {
		this.x = x;
	}

	get yPos() {
		return this.y;
	}
	set yPos(y) {
		this.y = y;
	}

	get fallSpeed() {
		return this.s;
	}
	set fallSpeed(s) {
		this.s = s;
	}

	draw() {
		ellipse(this.x, this.y, this.r, this.r);
	}
}
