$(document).ready(function(){

	UserForm.renderOnPage()
	User.renderUsersAtStart()

	const snakeHead = new SnakeHead()
	let food = new Food()

	const playground = $('#game-container')

	playground.append(food.render())
	// let snakeHeadEl = $("#head")

	let snakeAlive = true

	let leftBound = -1
	let rightBound = 586
	let topBound = -1
	let bottomBound = 391

	const moves = []


	let gameFlow = setInterval(function(){
		//snake dies if it hits the wall
		if (snakeHead.coordinates[0] <= leftBound || snakeHead.coordinates[0] >= rightBound
		|| snakeHead.coordinates[1] <= topBound || snakeHead.coordinates[1] >= bottomBound) {
			snakeAlive = false
			console.log('Snake has died. Hit refresh to start a new game')
		}
		//snake dies if it hits itself
		snakeHead.tailBlocks.some(function(tailBlock){
			if (snakeHead.coordinates[0] === tailBlock.coordinates[0] &&
				snakeHead.coordinates[1] === tailBlock.coordinates[1]){
				snakeAlive = false
			console.log('Snake has died. Hit refresh to start a new game')
			}
		})

		//checks if snakehead is in the same place as the food
		function snakeEatsFood() {
			return snakeHead.coordinates[0] === food.coordinates[0] && snakeHead.coordinates[1] === food.coordinates[1]
		}

		//runs the actual playing of the game
		if (snakeAlive && Game.gameOn) {

			snakeHead.advance()

			Tail.advanceAll()


				if (snakeEatsFood()) {
					food.delete()
					food = new Food()
					playground.append(food.render())

					let snakeTail = new Tail(snakeHead)

				}

				snakeHead.delete()
				Tail.deleteAll()
				playground.append(snakeHead.render() + Tail.renderAll())


			}


},50)




	// gives tailblocks the ability to follow the head and turn at the same location the head turned
		$(document).on('keydown', function(event){
			if (Game.gameOn) {
				event.preventDefault()
			}
			// check if snakeHead has changed bearing in current coordinates yet
			if (snakeHead.bearingChangeChecker === false) {
			switch (event.keyCode) {
				case 38: //up arrow
				// debugger
					if (Game.gameOn && snakeHead.bearing !== "down" && snakeHead.bearing !== "up"){
						console.log('pressed up and bearing =', snakeHead.bearing)
						snakeHead.bearing = "up"
						moves.push({coordinates: snakeHead.coordinates.slice(), bearing: snakeHead.bearing.slice()})
						snakeHead.tailBlocks.forEach( tailBlock => tailBlock.moves.push(moves.slice(-1)[0]) )
						// disallow bearing from changing until snakeHead advances again
						snakeHead.bearingChangeChecker = true

						console.log(moves)
						snakeHead.tailBlocks.forEach( tailBlock => console.log(tailBlock.id, tailBlock.moves))
					}
					break;
				case 40: //down arrow
					if (Game.gameOn && snakeHead.bearing !== "up" && snakeHead.bearing !== "down"){
						snakeHead.bearing = "down"
						moves.push({coordinates: snakeHead.coordinates.slice(), bearing: snakeHead.bearing.slice()})
						snakeHead.tailBlocks.forEach( tailBlock => tailBlock.moves.push(moves.slice(-1)[0]) )
						snakeHead.bearingChangeChecker = true

						console.log(moves)
						snakeHead.tailBlocks.forEach( tailBlock => console.log(tailBlock.id, tailBlock.moves))
					}
					break;
				case 37: // left arrow
					if (Game.gameOn && snakeHead.bearing !== "right" && snakeHead.bearing !== "left"){
						snakeHead.bearing = "left"
						moves.push({coordinates: snakeHead.coordinates.slice(), bearing: snakeHead.bearing.slice()})
						snakeHead.tailBlocks.forEach( tailBlock => tailBlock.moves.push(moves.slice(-1)[0]) )
						snakeHead.bearingChangeChecker = true

						console.log(moves)
						snakeHead.tailBlocks.forEach( tailBlock => console.log(tailBlock.id, tailBlock.moves))
					}
					break;
				case 39: //right arrow
					if (Game.gameOn && snakeHead.bearing !== "left" && snakeHead.bearing !== "right"){
						snakeHead.bearing = "right"
						moves.push({coordinates: snakeHead.coordinates.slice(), bearing: snakeHead.bearing.slice()})
						snakeHead.tailBlocks.forEach( tailBlock => tailBlock.moves.push(moves.slice(-1)[0]) )
						snakeHead.bearingChangeChecker = true

					console.log(moves)
					snakeHead.tailBlocks.forEach( tailBlock => console.log(tailBlock.id, tailBlock.moves))
					}
					break;
				case 32: //spacebar pauses the game
					event.preventDefault()
					if (Game.gameReady) {
					// if ($('#user-form').attr('style') === "display: none;") {
						Game.gameOn = !Game.gameOn
					}
					// snakeHead.bearingChangeChecker = true
					break;
			}
		}
		})

	// }

})

//1 unit of movement is 15x15 pixels
//numPixels would look like "105px"
// function convertPxToNum(numPixels){
// 	return parseInt(numPixels/*.slice(0,-2)*/)/15
// }
