// want game instance to contain:
// tailSize
// {coordinates: , bearing: } for the head and each tail block
// user info


const Game = (function() {
	let nextId = 1
	const games = []
	return class Game {
 // left 285px, top 0px, bearing down
		constructor(snakeHead, user){
			this.user = user
			this.id = nextId++
			this.snakeHead = snakeHead
			this.gameOn = false
			this.gameReady = true
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
