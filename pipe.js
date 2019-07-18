class Pipe {
	constructor(w, ch, x, s, gh) {
		this.w = w; // width
		this.ch = ch; // canvas height
		this.x = x; // x position
		this.s = s; // speed
		this.gh = gh; // gap height
		this.gp = random(30, 350); // gap position

		// Generate top and bottom components
		this.topHeight = this.gp;
		this.bottomYPos = this.gp + 120;
		this.bottomHeight = this.ch - this.gh - this.topHeight;
	}

	get topComponentHeight() {
		return this.topHeight;
	}

	get bottomComponentHeight() {
		return this.bottomHeight;
	}

	get xPos() {
		return this.x;
	}
	set xPos(x) {
		this.x = x
	}

	get yPos() {
		return this.y;
	}
	set yPos(y) {
		this.y = y;
	}

	get speed() {
		return this.s;
	}
	set speed(s) {
		this.s = s;
	}

	draw() {
		// Top component
		rect(this.x, 0, this.w, this.topHeight);

		// Bottom component
		rect(this.x, this.bottomYPos, this.w, this.bottomHeight);
	}
}