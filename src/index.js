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


    const scoreContainer = $('#score-container')
    const gifContainer   = $('.gif-container')
    let displayingGif    = false



    let gameFlow = setInterval(function() {
        //snake dies if it hits the wall
        if (notWithinBound()) {
            handleGameLost()
        }
        //snake dies if it hits itself
        snakeHead.tailBlocks.some(function(tailBlock) {
            if (snakeAteItself(tailBlock)) {
                handleGameLost()
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

                scoreContainer.html(`<div id="score" class="">Score:<span style="color: darkred">${game.score()}</span></div>`)

                if (game.score() / 100 > 1 && !displayingGif) {
                    displayGif("exited")
                }
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
                            gameFlow
                          $('#play-instructions').addClass('animated fadeOutUp')
                          $('#score').fadeIn()
                          $('#save-game').fadeIn()
                        }
                        if (!game.gameOn) {
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
        snakeAlive = false
        game.gameOn = false
        $('#saved-games-container').html('')
        $('#message').html(`Score was: ${snakeHead.tailBlocks.length * 5 * snakeHead.tailBlocks.length}`)
        $('#message-container').show()
        $('#save-game').hide()
        clearInterval(gameFlow)
        displayGif("sad")

    }

function displayGif(mood) {

    gifContainer.show()

    displayingGif = true

    setTimeout(function(){
        gifContainer.hide()
        gifContainer.attr('style', `background-image: url(${ mood == "exited" ? getExitedGif() : getSadGif() })`)
        displayingGif = false
    }, 4000)

}

    function getSadGif() {
        const sadGifs = ["https://media.giphy.com/media/5WmyaeDDlmb1m/giphy.gif", "https://media.giphy.com/media/xlnD8sWgnBBja/giphy.gif", "https://media.giphy.com/media/vcNsKUQ07oPLy/giphy.gif", "https://media.giphy.com/media/Ys2Z1pTvkGhH2/giphy.gif", "https://media.giphy.com/media/2WxWfiavndgcM/giphy.gif"]

        return sadGifs[Math.floor(Math.random() * sadGifs.length)]
    }

    function getExitedGif() {
        const exitedGifs = ['https://media.giphy.com/media/10ERZqYioLWJ6U/giphy.gif', 'https://media.giphy.com/media/XreQmk7ETCak0/giphy.gif', 'https://media.giphy.com/media/l0MYxef0mpdcnQnvi/giphy.gif', 'https://media.giphy.com/media/jpXAdNRiwGL0k/giphy.gif', "https://media.giphy.com/media/msKNSs8rmJ5m/giphy.gif", "https://media.giphy.com/media/d4blihcFNkwE3fEI/giphy.gif"]

        return exitedGifs[Math.floor(Math.random() * exitedGifs.length)]
    }

})
//1 unit of movement is 15x15 pixels
//numPixels would look like "105px"
// function convertPxToNum(numPixels){
// 	return parseInt(numPixels/*.slice(0,-2)*/)/15
// }
