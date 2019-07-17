class Bird {
	constructor(x, y, s, d) {
		this.x = x; // x position
		this.y = y; // y position
		this.s = s; // speed
		this.d = d; // diameter
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
		ellipse(this.x, this.y, this.d, this.d);
	}
}
