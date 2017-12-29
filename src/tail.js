const Tail = (function(){
    let tailBlocks = []
    let idCounter = 0
    return class Tail {
        // the bearing and coodinates paramaters are for creating tail from saved game
        constructor(snakeHead, bearing = null, coordinates = null, nextMoveIndex = null) {
          this.snakeHead = snakeHead
          if (!bearing) {
          // create tail from eating food
            this.setBearingAndCoordinates()
            if (this.snakeHead.tailBlocks.length === 0) {
              this.nextMoveIndex = null
            } else {
              this.nextMoveIndex = this.snakeHead.tailBlocks[this.snakeHead.tailBlocks.length - 1].nextMoveIndex
            }
          //otherwise, reinstate the saved info
          } else {
            this.bearing = bearing
            this.coordinates = coordinates
            this.nextMoveIndex = nextMoveIndex
          }

          this.snakeHead.tailBlocks.push(this)

          // this line necessary anymore?
          tailBlocks.push(this)
          this.id = idCounter++
        }

        // necessary?
        static tailBlocks(){
          return tailBlocks
        }

        //this would render all instances of tail EVER 
        // static renderAll(){
        //   return this.tailBlocks().map(tail => tail.render()).join('')
        // }

        coordinatesBearingAndNextMoveIndex() {
          return {coordinates: this.coordinates, bearing: this.bearing, nextMoveIndex: this.nextMoveIndex}
        }

        setBearingAndCoordinates() {
            let tailBearing = ''
            if (this.snakeHead.tailBlocks.length === 0) {
                this.bearing = this.snakeHead.bearing.slice()
                this.coordinates = this.snakeHead.coordinates.slice()
            }
            else {
              // debugger
                this.bearing = this.snakeHead.tailBlocks[this.snakeHead.tailBlocks.length - 1].bearing.slice()
                this.coordinates = this.snakeHead.tailBlocks[this.snakeHead.tailBlocks.length - 1].coordinates.slice()

            }
            switch (this.bearing) {
              case "up":
                  this.coordinates[1] += 15
                  break;

              case "right":
                  this.coordinates[0] -= 15
                  break;

              case "down":
                  this.coordinates[1] -= 15
                  break;

              case "left":
                  this.coordinates[0] += 15
                  break;
              }

        }

        // phase out advanceAll because it does for all snakeHeads
        static advanceAll() {
          tailBlocks.forEach(tailBlock => tailBlock.advance())
        }

        reachesMove() {
          return (
            typeof this.nextMoveIndex === 'number' &&
            this.nextMoveIndex < this.snakeHead.moves.length &&
            this.coordinates[0] === this.snakeHead.moves[this.nextMoveIndex].coordinates[0] &&
            this.coordinates[1] === this.snakeHead.moves[this.nextMoveIndex].coordinates[1]
          )
        }

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

          if (this.reachesMove()) {
            this.bearing = this.snakeHead.moves[this.nextMoveIndex].bearing
            this.nextMoveIndex += 1
          }
        }

        render() {
        	// let renderHTML =
        	return `
        	<div class="tail" id="tail-${this.id}" style="left: ${this.coordinates[0]}px; top: ${this.coordinates[1]}px">
            </div>
        	`
        }
        //this is here b/c it doesn't depend on snakehead at all 
        //find this element in the DOM and remove all of it
        static removeAll() {
            $('.tail').remove()
        }

    }
})()
