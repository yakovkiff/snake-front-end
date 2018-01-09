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

  function displayGame(savedGame) {
    const playground = $('#game-container')
    playground.append(savedGame.snakeHead.render() + savedGame.snakeHead.renderTail())
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

    $('#save-game').on('click', function() {      
      UserForm.renderOnPage()
      game.gameReady = false
      $('#user-form-container').show()
    })

    //event listener for submit new user
    $('#user-form-container').on('click', function(event){
      if (event.target.id === 'save-user') {
        const userName = $('#user-name').value
        console.log("user name", userName)
        game.user = new User(userName)
        game.gameReady = true
        console.log("i am in user-form-container, about to save game")
        console.log('snakeHead.tailBlocks is: ', snakeHead.tailBlocks)
        snakeHead.trimMovesBeforeSaving()
        saveGame(game)
        $('#user-form-container').hide()
      }
    })

    //event listener for submit new user
    $('#saved-games-container').on('click', function(event){
      if (event.target.id === 'resume-saved-game') {
        // const numGames = Game.count()
        console.log('clicked resume save game')
        clearInterval(gameFlow)
        Game.removeEventListeners()
        playground.empty()
        retrieveGame()
          .then(function(gameData) {
            console.log('gameData is: ', gameData)
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


    $('#message-container').on('click', function() {
      if (event.target.nodeName === "BUTTON" && event.target.id === "new-game-btn") {
        location.reload();
      }
      if (event.target.nodeName === "BUTTON" && event.target.id === "save-score-btn") {
        submitUser()
      }
    })


}
