const gamesAdapt = new GamesAdapter()

function saveGame(game){
	event.preventDefault()

	// gamesAdapt.createUser(name, email).then(function(){User.renderUsersWithNewUser()})
	console.log("about to save in gamesHandler")
	return gamesAdapt.saveGame(game)
		.then(function(resp) {
			console.log('resp is: ', resp)
			alert("Game Saved.")
		})
	Game.gameOn = false
}

function retrieveGame() {
	return gamesAdapt.getGame().then(function(game) {
		console.log("this is from database", game)
		return game
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
