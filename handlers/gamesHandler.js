gamesAdapt = new GamesAdapter()

function saveGame(game){
	event.preventDefault()

	// gamesAdapt.createUser(name, email).then(function(){User.renderUsersWithNewUser()})
	gamesAdapt.saveGame(game)


	Game.gameOn = false

	alert("Game Saved.")

	$('#saved-games-container').html('<button id="resume-saved-game">Resume Saved Game</button>')


}

function retrieveGame() {

	gamesAdapt.getGames().then(function(res) {
		console.log("this is from database", res)
		// game = new Game()


	})

}
