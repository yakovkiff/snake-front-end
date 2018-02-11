class GamesAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/v1/games'
    // this.baseUrl = 'https://snake-web-game-api.herokuapp.com/api/v1/games'
  }

  getGame(username) {
    return fetch(this.baseUrl + `/${username}`).then(resp => resp.json())
  }

  saveGame(game) {
    console.log("in saveGame in gamesAdapter")
    console.log(game.user.name)
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
