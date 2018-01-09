class GamesAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/v1/games'
    // this.baseUrl = 'https://snake-web-game-api.herokuapp.com/api/v1/games'
  }

  getGame() {
    return fetch(this.baseUrl).then(resp => resp.json())
    //fetch is a get request to the URL
    //then it is parsed in JSON

  }

  saveGame(game) {
    console.log("in saveGame in gamesAdapter")
    console.log("looking at snake data:", game.snakeData())
    const gameCreateParams = {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        userName: game.user.name,
        snakeCoordinatesAndBearing: game.snakeData()
      })
    }
    return fetch(this.baseUrl, gameCreateParams).then(resp => resp.json())
  }

}
