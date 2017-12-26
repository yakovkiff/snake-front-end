const gamesAdapt = new GamesAdapter()

function saveGame(game){
	event.preventDefault()

	// gamesAdapt.createUser(name, email).then(function(){User.renderUsersWithNewUser()})
	console.log("about to save in gamesHandler")
	gamesAdapt.saveGame(game)


	Game.gameOn = false

	alert("Game Saved.")

}

function retrieveGame() {

	gamesAdapt.getGame().then(function(res) {
		console.log("this is from database", res)
		const snakeHead = new SnakeHead(res.snakeHead.bearing, [res.snakeHead.x, res.snakeHead.y])
		res.tail.forEach(tailBlock => new Tail(snakeHead, tailBlock.bearing, [tailBlock.x, tailBlock.y]))
		new Game(snakeHead)
	})

}

function gameExists() {

	gamesAdapt.getGame().then(function(res) {

			if (res.game.id === null) {
				return false
			}
			else {
				return true
			}
		// return false
	})

}
