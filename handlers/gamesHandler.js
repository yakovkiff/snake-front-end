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
		game = new Game()


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
