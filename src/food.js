class food {
	constructor(coordinates = []) {
		this.coordinates = coordinates
		let x = getRandom(0, 585)
		let y = getRandom(0, 390)
		this.coordinates.push(x)
		this.coordinates.push(y)
	}

	getRandom(min, max) {
  		return Math.random() * (max - min) + min;
	}
}