// want game instance to contain:
// tailSize
// {coordinates: , bearing: } for the head and each tail block
// user info


const Game = (function() {
	let nextId = 1
	const games = []
	return class Game {

		constructor(user, snakeHead, tailSize = 0) {
			this.user = user
			this.snakeHead = snakeHead
			this.tailSize = tailSize
			games.push(this)
		}

		static all() {
			return games
		}

		snakeCoordinatesAndBearing() {
			return {snake: snakeHead.coordinatesAndBearing(), tail: snakeHead.tailCoordinatesAndBearing()}
		}

	 	save() {
			// this.snakeHead.tailSize()
		}

	}
})()
