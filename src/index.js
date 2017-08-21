$(document).ready(function(){

	const snake = new Snake()

	const playground = $('#game-container')

	let snakeHead = $("#head")

	let gameOn = true

	let snakeAlive = true

	let leftBound = -1
	let rightBound = 586
	let topBound = -1
	let bottomBound = 391

	let gameFlow = setInterval(function(){

		if (snake.coordinates[0] <= leftBound || snake.coordinates[0] >= rightBound
		|| snake.coordinates[1] <= topBound || snake.coordinates[1] >= bottomBound) {
			snakeAlive = false
		}

		if (snakeAlive && gameOn) {
			snake.advance()
			playground.html(snake.render())
		}

	},250)

	$(document).on('keyup', function(event){
		console.log(event.keyCode)
		switch (event.keyCode) {
			case 38:
				snake.bearing = "up"
				break;
			case 40:
				snake.bearing = "down"
				break;
			case 37:
				snake.bearing = "left"
				break;
			case 39:
				snake.bearing = "right"
				break;
			case 32:
				gameOn = !gameOn
				break;

		}
	})
})

//1 unit of movement is 15x15 pixels
//numPixels would look like "105px"
// function convertPxToNum(numPixels){
// 	return parseInt(numPixels/*.slice(0,-2)*/)/15
// }







