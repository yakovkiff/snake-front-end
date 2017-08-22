$(document).ready(function(){

	const snakeHead = new SnakeHead()
	let food = new Food()

	const playground = $('#game-container')

	playground.append(food.render())
	// let snakeHeadEl = $("#head")

	let gameOn = true

	let snakeAlive = true

	let leftBound = -1
	let rightBound = 586
	let topBound = -1
	let bottomBound = 391

	const moves = []

(function gameFlow(){
	setInterval(function(){

		if (snakeHead.coordinates[0] <= leftBound || snakeHead.coordinates[0] >= rightBound
		|| snakeHead.coordinates[1] <= topBound || snakeHead.coordinates[1] >= bottomBound) {
			snakeAlive = false
			console.log('Snake has died. Hit refresh to start a new game')
		}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
		function snakeEatsFood() {
			return snakeHead.coordinates[0] === food.coordinates[0] && snakeHead.coordinates[1] === food.coordinates[1]
		}


		if (snakeAlive && gameOn) {
			
			snakeHead.advance()
			
			Tail.advanceAll()

			if (snakeEatsFood()) {
				async function doSomething() {
					food.delete()
					food = new Food()
					playground.append(food.render())
					clearInterval(gameFlow)
					await sleep(2000)
					let snakeTail = new Tail(snakeHead)
					gameFlow()
				}
			doSomething()

			}
			snakeHead.delete()
			Tail.deleteAll()
			playground.append(snakeHead.render() + Tail.renderAll())
		}

	},150)
})()

		// function tailBlockExists(){
		// 	if (Tail.tailBlocks())
		// }

		// function addMoveToTail(){
		// 	Tail.tailBlocks().forEach( tailBlock => tailBlock.moves.push(moves.slice(-1)) )
		// }


	$(document).on('keyup', function(event){
		console.log(event.keyCode)
		switch (event.keyCode) {
			case 38:
				if (snakeHead.bearing !== "down"){
					snakeHead.bearing = "up"
					moves.push({coordinates: snakeHead.coordinates.slice(), bearing: snakeHead.bearing.slice()})
					Tail.tailBlocks().forEach( tailBlock => tailBlock.moves.push(moves.slice(-1)[0]) )	
				}
				break;
			case 40:
				if (snakeHead.bearing !== "up"){
					snakeHead.bearing = "down"
					moves.push({coordinates: snakeHead.coordinates.slice(), bearing: snakeHead.bearing.slice()})
					Tail.tailBlocks().forEach( tailBlock => tailBlock.moves.push(moves.slice(-1)[0]) )
				}
				break;
			case 37:
				if (snakeHead.bearing !== "right"){
					snakeHead.bearing = "left"
					moves.push({coordinates: snakeHead.coordinates.slice(), bearing: snakeHead.bearing.slice()})
					Tail.tailBlocks().forEach( tailBlock => tailBlock.moves.push(moves.slice(-1)[0]) )

				}
				break;
			case 39:
				if (snakeHead.bearing !== "left"){
					snakeHead.bearing = "right"
					moves.push({coordinates: snakeHead.coordinates.slice(), bearing: snakeHead.bearing.slice()})
					Tail.tailBlocks().forEach( tailBlock => tailBlock.moves.push(moves.slice(-1)[0]) )

				}
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




