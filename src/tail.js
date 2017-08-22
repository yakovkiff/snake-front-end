const Tail = (function(){
    let tailBlocks = []
    let idCounter = 0
    return class Tail {
        constructor(snakeHead) {
            this.snakeHead = snakeHead
            // this.snakeHead.snakeTailBlocks.push(this)
            this.setBearingAndCoordinates()
            tailBlocks.push(this)
            this.moves = []
            this.id = idCounter++
        }

        static tailBlocks(){
            return tailBlocks
        }

        static renderAll(){
            return this.tailBlocks().map(tail => tail.render()).join('')
        }

        setBearingAndCoordinates() {
            let tailBearing = ''
            if (tailBlocks.length === 0) {
                this.bearing = this.snakeHead.bearing.slice()
                this.coordinates = this.snakeHead.coordinates.slice()
            }
            else {
              // debugger
                this.bearing = tailBlocks[tailBlocks.length - 1].bearing.slice()
                this.coordinates = tailBlocks[tailBlocks.length - 1].coordinates.slice()

            }
            switch (this.bearing) {
              case "up":
                  console.log("case up")
                  this.coordinates[1] -= 30
                  break;

              case "right":

                console.log("case right")

                  this.coordinates[0] += 30
                  break;

              case "down":
              console.log("case down")

                  this.coordinates[1] += 30
                  break;

              case "left":
              console.log("case left")

                  this.coordinates[0] -= 30
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
        	<div class="tail" id="tail" style="left: ${this.coordinates[0]}px; top: ${this.coordinates[1]}px">
            </div>
        	`
        }
        static deleteAll() {
            $('.tail').remove()
        }

    }
})()
