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
			// this.over = false
			this.gameReady = true
			games.push(this)
		}

		static count() {
			return nextId - 1
		}

		static last() {
			return games[games.length - 1]
		}

		static removeEventListeners() {
			$(document).off()
			$('#save-game').off()
			$('#user-form-container').off()
			$('#saved-games-container').off()
			$('#message-container').off()
		}

		snakeData() {
			return {snake: this.snakeHead.coordinatesBearingAndMoves(), tail: this.snakeHead.tailCoordinatesBearingAndNextMoveIndex()}
		}

	 	save() {

		}
		score() {
			return this.snakeHead.tailBlocks.length * 5 * this.snakeHead.tailBlocks.length

		}

	}
})()
