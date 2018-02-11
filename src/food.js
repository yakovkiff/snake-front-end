const Food = (function () {
	let foodCount = 0
	const animations = ['bounce', 'rubberBand', 'shake', 'tada', 'jello', 'jackInTheBox']

	return class Food {
		constructor(snakeCoordinates = []) {
			this.snakeCoordinates = snakeCoordinates
			// x max is 585/15
			//y max is 390/15
			this.coordinates = this.produceAndCheckCoordinates()
			foodCount++
		}

		getRandomMultipleOfFifteen(min, max) {
			return Math.round((Math.random() * (max - min) + min)) * 15
		}

		produceCoordinates() {
			const x = this.getRandomMultipleOfFifteen(0, 39)
			const y = this.getRandomMultipleOfFifteen(0, 26)
			return [x, y]
		}

		produceAndCheckCoordinates() {
			let coordinates = this.produceCoordinates()
			// while there is some ordered pair in snakeCoordinates that matches the produced food coordinates...
			while (this.snakeCoordinates.some(orderedPair => orderedPair[0] === coordinates[0] && orderedPair[1] === coordinates[1])) {
				coordinates = this.produceCoordinates()
			}
			return coordinates
		}

		render() {
			return `
			<div class="food animated ${animations[Math.floor(Math.random() * animations.length)]}" id="food" style="left: ${this.coordinates[0]}px; top: ${this.coordinates[1]}px">
			</div>
		`
		}

		delete() {
			$('#food').remove()
		}

	}
})()
