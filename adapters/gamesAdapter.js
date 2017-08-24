class gamesAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/v1/games'
  }

  getgames() {
    return fetch(this.baseUrl).then(resp => resp.json())
    //fetch is a get request to the URL
    //then it is parsed in JSON

  }

  saveGame(game) {
    if (!game.savedYet) {

    };
    const gameCreateParams = {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({game: {user: game.user, id: game.id, tailSize: game.tailSize, snakeCoordinatesAndBearing: game.snakeCoordinatesAndBearing()}})
    }
    return fetch(this.baseUrl, gameCreateParams).then( resp => resp.json() ).then(resp=>console.log(resp))
  }

}