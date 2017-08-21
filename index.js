$(document).ready(function(){

	const snake = new Snake()

	const playground = $('#game-container')

	let snakeHead = $("#head")

	let gameOn = true

	let snakeAlive = true

	let leftBound = -1
	let rightBound = 586
	let topBound = -1
	let bottomBound = 391

	let gameFlow = setInterval(function(){

		if (snake.coordinates[0] <= leftBound || snake.coordinates[0] >= rightBound
		|| snake.coordinates[1] <= topBound || snake.coordinates[1] >= bottomBound) {
			snakeAlive = false
		}

		if (snakeAlive && gameOn) {
			snake.advance()
			playground.html(snake.render())
		}

	},250)

	$(document).on('keyup', function(event){
		console.log(event.keyCode)
		switch (event.keyCode) {
			case 38:
				snake.bearing = "up"
				break;
			case 40:
				snake.bearing = "down"
				break;
			case 37:
				snake.bearing = "left"
				break;
			case 39:
				snake.bearing = "right"
				break;
			case 32:
				gameOn = !gameOn
				break;

		}
	})
})

//1 unit of movement is 15x15 pixels
//numPixels would look like "105px"
// function convertPxToNum(numPixels){
// 	return parseInt(numPixels/*.slice(0,-2)*/)/15
// }

class Snake {
    // implement your solution here!
    //
    constructor(bearing = 'down', coordinates = [15, 15]) {
        this.bearing = bearing
        this.coordinates = coordinates
    }
    orient(direction) {
        let points = ["up", "down", "right", "left"]
        if (points.includes(direction)) { this.bearing = direction } else { throw new Error("Invalid Snake Bearing") }
    }
    turnRight() {
        switch (this.bearing) {
            case "up":
                this.orient("right")
                break;

            case "right":
                this.orient("down")
                break;

            case "down":
                this.orient("left")
                break;

            case "left":
                this.orient("up")
                break;
        }
    }
    turnLeft() {
        switch (this.bearing) {
            case "up":
                this.orient("left")
                break;

            case "right":
                this.orient("up")
                break;

            case "down":
                this.orient("right")
                break;

            case "left":
                this.orient("down")
                break;
        }
    }
    // at(x, y) {
    //     this.coordinates = [x, y];
    // }
    advance() {
        switch (this.bearing) {
            case "up":
                this.coordinates[1] -= 15
                break;

            case "right":
                this.coordinates[0] += 15
                break;

            case "down":
                this.coordinates[1] += 15
                break;

            case "left":
                this.coordinates[0] -= 15
                break;
        }
    }
    render() {
    	// let renderHTML =
    	return `
    	<div class="head" id="head" style="left: ${this.coordinates[0]}px; top: ${this.coordinates[1]}px">
        </div>
    	`
    }
    instructions(string) {
        // if (instructions === "R") {return ["turnRight"]}
        // else if (instructions === "L") {return ["turnLeft"]}
        // else if (instructions === "A") {return ["advance"]}
        let instructionsObject = { R: 'turnRight', L: 'turnLeft', A: 'advance' }
        let result = []
        let instructions = string.split("")
        instructions.forEach((instruction) => result.push(instructionsObject[instruction]))
        return result
    }
    place(xyDirectionObject) {
        // Snake1.place({x: 0, y: 0, direction: "up"});
        this.orient(xyDirectionObject["direction"])
        this.at(xyDirectionObject["x"], xyDirectionObject["y"])
    }
    evaluate(string) {
        let commands = this.instructions(string)
        // let commandCenter = {turnRight: this.turnRight, turnLeft: this.turnLeft, advance:this.advance}
        // commands.forEach(command => commandCenter[command].call(this))

        commands.forEach(function(command) {
        		this[command]()

        	})
    }

}
