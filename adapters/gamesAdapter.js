class GamesAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/v1/games'
  }

  getGame() {
    return fetch(this.baseUrl).then(resp => resp.json())
    //fetch is a get request to the URL
    //then it is parsed in JSON

  }

  saveGame(game) {
    console.log("in saveGame in gamesAdapter")
    const gameCreateParams = {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        // user: game.user,
        snakeCoordinatesAndBearing: game.snakeCoordinatesAndBearing()
        // id: game.id
      })
    }
    return fetch(this.baseUrl, gameCreateParams).then(resp => resp.json())
  }

}
