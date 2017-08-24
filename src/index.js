$(document).ready(function() {


    User.renderUsersAtStart()

    const snakeHead = new SnakeHead()
    const game = new Game(snakeHead)
    let food = new Food()

    const playground = $('#game-container')

    playground.append(food.render())
    // let snakeHeadEl = $("#head")

    let snakeAlive = true

    let leftBound = -1
    let rightBound = 586
    let topBound = -1
    let bottomBound = 391

    const moves = []
    let user = ''






    let gameFlow = setInterval(function() {
        $('#score-container').html(`Score: ${snakeHead.tailBlocks.length * 5 * snakeHead.tailBlocks.length}`)
        //snake dies if it hits the wall
        if (snakeHead.coordinates[0] <= leftBound || snakeHead.coordinates[0] >= rightBound ||
            snakeHead.coordinates[1] <= topBound || snakeHead.coordinates[1] >= bottomBound) {
            snakeAlive = false
            $('#saved-games-container').html('')
            console.log('Snake has died. Hit refresh to start a new game')

        }
        //snake dies if it hits itself
        snakeHead.tailBlocks.some(function(tailBlock) {
            if (snakeHead.coordinates[0] === tailBlock.coordinates[0] &&
                snakeHead.coordinates[1] === tailBlock.coordinates[1]) {
                snakeAlive = false
                console.log('Snake has died. Hit refresh to start a new game')
            }
        })

        //checks if snakehead is in the same place as the food
        function snakeEatsFood() {
            return snakeHead.coordinates[0] === food.coordinates[0] && snakeHead.coordinates[1] === food.coordinates[1]
        }

        //runs the actual playing of the game
        if (snakeAlive && game.gameOn) {

            snakeHead.advance()

            Tail.advanceAll()

            if (snakeEatsFood()) {
                food.delete()
                food = new Food()
                playground.append(food.render())

                let snakeTail = new Tail(snakeHead)
            }
            snakeHead.delete()
            Tail.deleteAll()
            playground.append(snakeHead.render() + Tail.renderAll())
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

        //event listener for submit new user
    $('#saved-games-container').click(function(event){
      if (event.target.id === 'resume-saved-game') {
        retrieveGame()
        }
    })


    // gives tailblocks the ability to follow the head and turn at the same location the head turned
    $(document).on('keydown', function(event) {
        if (game.gameOn) {
            event.preventDefault()
        }
        // check if snakeHead has changed bearing in current coordinates yet
        if (snakeHead.bearingChangeChecker === false) {
            switch (event.keyCode) {
                case 38: //up arrow
                    // debugger
                    if (game.gameOn && snakeHead.bearing !== "down" && snakeHead.bearing !== "up") {
                        console.log('pressed up and bearing =', snakeHead.bearing)
                        snakeHead.bearing = "up"
                        moves.push({ coordinates: snakeHead.coordinates.slice(), bearing: snakeHead.bearing.slice() })
                        snakeHead.tailBlocks.forEach(tailBlock => tailBlock.moves.push(moves.slice(-1)[0]))
                        // disallow bearing from changing until snakeHead advances again
                        snakeHead.bearingChangeChecker = true

                        console.log(moves)
                        snakeHead.tailBlocks.forEach(tailBlock => console.log(tailBlock.id, tailBlock.moves))
                    }
                    break;
                case 40: //down arrow
                    if (game.gameOn && snakeHead.bearing !== "up" && snakeHead.bearing !== "down") {
                        snakeHead.bearing = "down"
                        moves.push({ coordinates: snakeHead.coordinates.slice(), bearing: snakeHead.bearing.slice() })
                        snakeHead.tailBlocks.forEach(tailBlock => tailBlock.moves.push(moves.slice(-1)[0]))
                        snakeHead.bearingChangeChecker = true

                        console.log(moves)
                        snakeHead.tailBlocks.forEach(tailBlock => console.log(tailBlock.id, tailBlock.moves))
                    }
                    break;
                case 37: // left arrow
                    if (game.gameOn && snakeHead.bearing !== "right" && snakeHead.bearing !== "left") {
                        snakeHead.bearing = "left"
                        moves.push({ coordinates: snakeHead.coordinates.slice(), bearing: snakeHead.bearing.slice() })
                        snakeHead.tailBlocks.forEach(tailBlock => tailBlock.moves.push(moves.slice(-1)[0]))
                        snakeHead.bearingChangeChecker = true

                        console.log(moves)
                        snakeHead.tailBlocks.forEach(tailBlock => console.log(tailBlock.id, tailBlock.moves))
                    }
                    break;
                case 39: //right arrow
                    if (game.gameOn && snakeHead.bearing !== "left" && snakeHead.bearing !== "right") {
                        snakeHead.bearing = "right"
                        moves.push({ coordinates: snakeHead.coordinates.slice(), bearing: snakeHead.bearing.slice() })
                        snakeHead.tailBlocks.forEach(tailBlock => tailBlock.moves.push(moves.slice(-1)[0]))
                        snakeHead.bearingChangeChecker = true

                        console.log(moves)
                        snakeHead.tailBlocks.forEach(tailBlock => console.log(tailBlock.id, tailBlock.moves))
                    }
                    break;
                case 32: //spacebar pauses the game
                      if (game.gameReady) {
                        event.preventDefault()
                        game.gameOn = !game.gameOn
                        if (game.gameOn) {
                          $('#play-instructions').hide()
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
        if (game.user) {
          saveGame(game)
        }
        else {
        UserForm.renderOnPage()
        game.gameReady = false
      }
    })

})
//1 unit of movement is 15x15 pixels
//numPixels would look like "105px"
// function convertPxToNum(numPixels){
// 	return parseInt(numPixels/*.slice(0,-2)*/)/15
// }
