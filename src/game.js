// want game instance to contain:
// tailSize
// {coordinates: , bearing: } for the head and each tail block
// user info


const Game = (function() {
	let nextId = 1
	const games = []
	return class Game {

		constructor(user, snakeHead){//, tailSize = 0) {
			this.user = user
			this.id = nextId++
			this.snakeHead = snakeHead
			// this.tailSize = tailSize
			this.constructor.gameOn = false
			this.constructor.gameReady = false
			games.push(this)
			this.snakeCoordinatesAndBearing = this.snakeCoordinatesAndBearing()
		}

		static all() {
			return games
		}

		snakeCoordinatesAndBearing() {
			return {snake: this.snakeHead.coordinatesAndBearing(), tail: this.snakeHead.tailCoordinatesAndBearing()}
		}

	 	save() {

		}


	}
})()
