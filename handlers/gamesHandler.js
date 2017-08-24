gamesAdapt = new GamesAdapter()

function saveGame(game){
	event.preventDefault()	

	// gamesAdapt.createUser(name, email).then(function(){User.renderUsersWithNewUser()})
	gamesAdapt.saveGame(game)


	Game.gameOn = false

	alert("Game Saved.")

}
