function playGame(savedGame = null) {

  var game, snakeHead

  if (!savedGame) {
    snakeHead = new SnakeHead()
    game = new Game(snakeHead)
  } else {
    console.log("you are attempting to play a saved game")
    game = savedGame
    snakeHead = savedGame.snakeHead
  }

  let food = new Food()

  const playground = $('#game-container')
  playground.append(food.render())
  // let snakeHeadEl = $("#head")

  // let snakeAlive = true

//boundaries for container for notWithinBound
  let leftBound = -1
  let rightBound = 586
  let topBound = -1
  let bottomBound = 391

  const moves = []
  let user = ''

  const scoreContainer = $('#score-container')

  let gameFlow = setInterval(function() {
      //snake dies if it hits the wall
      if (notWithinBound() || snakeHead.tailBlocks.some(tailBlock => snakeAteItself(tailBlock))) {
          handleGameLost()
      }

      //checks if snakehead is in the same place as the food
      function snakeEatsFood() {
          return snakeHead.coordinates[0] === food.coordinates[0] && snakeHead.coordinates[1] === food.coordinates[1]
      }

      //runs the actual playing of the game
      if (!game.paused) {

          snakeHead.advance()
          snakeHead.advanceTail()

          if (snakeEatsFood()) {
            food.delete()
            food = new Food()
            playground.append(food.render())

            new Tail(snakeHead)

            scoreContainer.html(`<div id="score" class="">Score:<span style="color: darkred">${game.score()}</span></div>`)

            if (game.score() / 100 > 1 && !displayingGif) {
                displayGif("exited")
            }
          }

          snakeHead.remove()
          Tail.removeAll()
          playground.append(snakeHead.render() + snakeHead.renderTail())
      }


  }, 50)

  //event listener for submit new user
  $('#user-form-container').click(function(event){
    if (event.target.id === 'submit-user') {
    // debugger
    game.gameReady = true
    user = submitUser() //this returns a new User
    game.user = user
    saveGame(game)
  }
  })

  function displayGame(savedGame) {
    const playground = $('#game-container')
    playground.append(savedGame.snakeHead.render() + savedGame.snakeHead.renderTail())
    savedGame.snakeHead.tailBlocks.forEach(tail => {
      console.log('tailblock bearing: ' + tail.bearing)
      console.log('tailBlock coordinates: ' + tail.coordinates)
      console.log('tailBlock nextMoveIndex: ' + tail.nextMoveIndex)
    })
    savedGame.snakeHead.moves.forEach((move, index) => {
      console.log('MOVE INDEX: ' + index)
      console.log('move bearing: ' + move.bearing)
      console.log('move coordinates: ' + move.coordinates)
    })
  }

      //event listener for submit new user
  $('#saved-games-container').click(function(event){
    if (event.target.id === 'resume-saved-game') {
      // const numGames = Game.count()
      console.log('clicked resume save game')
      clearInterval(gameFlow)
      playground.empty()
      retrieveGame()
        .then(function(gameData) {
          console.log('gameData is: ', gameData)
          // put moves in as 3rd arg in line below
          const snakeHead = new SnakeHead(gameData.snakeHead.bearing, gameData.snakeHead.coordinates, gameData.snakeHead.moves)
      		gameData.tail.forEach(tailBlock => {
            new Tail(snakeHead, tailBlock.bearing, tailBlock.coordinates, tailBlock.nextMoveIndex)
          })
      		const game = new Game(snakeHead)
          displayGame(game)
          playGame(game)
        })
    }
  })

  function recordMove() {
    const move = { coordinates: snakeHead.coordinates.slice(), bearing: snakeHead.bearing.slice() }
    moves.push(move)
    snakeHead.tailBlocks.forEach(tailBlock => tailBlock.moves.push(move))
    snakeHead.bearingChangeChecker = true
  }

  // gives tailblocks the ability to follow the head and turn at the same location the head turned
  $(document).on('keydown', function(event) {
      if (!game.paused) {
          event.preventDefault()
      }
      // check if snakeHead has changed bearing in current coordinates yet
      if (snakeHead.bearingChangeChecker === false) {
        switch (event.keyCode) {
          case 38: //up arrow
              if (!game.paused && snakeHead.bearing !== "down" && snakeHead.bearing !== "up") {
                snakeHead.bearing = "up"
                snakeHead.recordMove()
              }
              break;
          case 40: //down arrow
              if (!game.paused && snakeHead.bearing !== "up" && snakeHead.bearing !== "down") {
                snakeHead.bearing = "down"
                snakeHead.recordMove()
              }
              break;
          case 37: // left arrow
              if (!game.paused && snakeHead.bearing !== "right" && snakeHead.bearing !== "left") {
                snakeHead.bearing = "left"
                snakeHead.recordMove()
              }
              break;
          case 39: //right arrow
              if (!game.paused && snakeHead.bearing !== "left" && snakeHead.bearing !== "right") {
                snakeHead.bearing = "right"
                snakeHead.recordMove()
              }
              break;
          case 32: //spacebar pauses the game
            if (game.gameReady) {
              event.preventDefault()
              game.paused = !game.paused
              if (!game.paused) {
                  gameFlow
                $('#play-instructions').addClass('animated fadeOutUp')
                $('#score').fadeIn()
                $('#save-game').fadeIn()
              }
            }
            break;
        }
      }
  })

  $('#save-game').click(function() {
      // if game has already been saved, immediately call saveGame()
      // to check this, check if game already has user
      // otherwise, render user form (when submit button is hit, saveGame is called)

      //if user is on second save
      // if (game.user) {
        console.log("just clicked on save game button")
        game.snakeHead.tailBlocks.forEach(tail => {
          console.log('tailblock bearing: ' + tail.bearing)
          console.log('tailBlock coordinates: ' + tail.coordinates)
          console.log('tailBlock nextMoveIndex: ' + tail.nextMoveIndex)
        })
        game.snakeHead.moves.forEach((move, index) => {
          console.log('MOVE INDEX: ' + index)
          console.log('move bearing: ' + move.bearing)
          console.log('move coordinates: ' + move.coordinates)
        })
        saveGame(game)
      // }
      // else {
      // UserForm.renderOnPage()
      // game.gameReady = false
    // }
  })

  $('#message-container').click(function() {
      if (event.target.nodeName === "BUTTON" && event.target.id === "new-game-btn") {
          location.reload();
      }
      if (event.target.nodeName === "BUTTON" && event.target.id === "save-score-btn") {
          submitUser()
      }
  })




////////////////
//
// HELPER FUNCTIONS
//
///////////////

function notWithinBound() {
  return snakeHead.coordinates[0] <= leftBound || snakeHead.coordinates[0] >= rightBound || snakeHead.coordinates[1] <= topBound || snakeHead.coordinates[1] >= bottomBound
}

function snakeAteItself(tailBlock) {
  return snakeHead.coordinates[0] === tailBlock.coordinates[0] && snakeHead.coordinates[1] === tailBlock.coordinates[1]
}
function handleGameLost() {
      // snakeAlive = false
      game.paused = true
      $('#saved-games-container').html('')
      $('#message').html(`Score was: ${snakeHead.tailBlocks.length * 5 * snakeHead.tailBlocks.length}`)
      $('#message-container').show()
      $('#save-game').hide()
      clearInterval(gameFlow)

  }

}
