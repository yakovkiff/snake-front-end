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
			this.paused = true
			this.over = false
			this.gameReady = true
			games.push(this)
		}

		static last() {
			return games[games.length - 1]
		}

		snakeCoordinatesAndBearing() {
			return {snake: this.snakeHead.coordinatesAndBearing(), tail: this.snakeHead.tailCoordinatesAndBearing()}
		}

	 	save() {

		}
		score() {
			return this.snakeHead.tailBlocks.length * 5 * this.snakeHead.tailBlocks.length

		}

	}
})()
