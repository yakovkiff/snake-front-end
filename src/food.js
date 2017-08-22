const Food = (function () {
	let foodCount = 0

	return class Food {
		constructor(coordinates = []) {
			this.coordinates = coordinates
			// x max is 585/15
			//y max is 390/15
			let x = this.getRandomMultipleOfFifteen(0, 39)
			let y = this.getRandomMultipleOfFifteen(0, 26)
			this.coordinates.push(x)
			this.coordinates.push(y)
			foodCount++
		}

		getRandomMultipleOfFifteen(min, max) {
			return Math.round((Math.random() * (max - min) + min)) * 15
		}

		render() {
			return `
			<div class="food" id="food" style="left: ${this.coordinates[0]}px; top: ${this.coordinates[1]}px">
			</div>
		`
		}

		delete() {
			$('#food').remove()
		}

	}
})()
