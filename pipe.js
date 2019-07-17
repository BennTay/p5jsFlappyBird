class Pipe {
	constructor(w, ch, x, s, gh) {
		this.w = w; // width
		this.ch = ch; // canvas height
		this.x = x; // x position
		this.s = s; // speed
		this.gh = gh; // gap height
		this.gp = random() * ch; // gap position
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
		rect(this.x, 0, this.w, this.ch);
	}
}