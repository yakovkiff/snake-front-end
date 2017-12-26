const Tail = (function(){
    let tailBlocks = []
    let idCounter = 0
    return class Tail {
        // the bearing and coodinates paramaters are for creating tail from saved game
        constructor(snakeHead, bearing = null, coordinates = null) {
          this.snakeHead = snakeHead
          // create tail from eating food
          if (!bearing) {
            this.setBearingAndCoordinates()
          } else {
            this.bearing = bearing
            this.coordinates = coordinates
          }
          
          if (this.snakeHead.tailBlocks.length === 0) {
            this.moves = []
          } else {
            this.moves = this.snakeHead.tailBlocks[this.snakeHead.tailBlocks.length - 1].moves.slice()
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

        // necessary?
        static renderAll(){
          return this.tailBlocks().map(tail => tail.render()).join('')
        }

        coordinatesAndBearing() {
          return {coordinates: this.coordinates, bearing: this.bearing}
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


        // at(x, y) {
        //     this.coordinates = [x, y];
        // }
        // phase out advanceAll because it does for all snakeHeads
        static advanceAll() {
          tailBlocks.forEach(tailBlock => tailBlock.advance())
        }

        advance() {
          // review these Ifs
          if (this.moves.length > 0) {
            // debugger
            if (this.coordinates[0] === this.moves[0].coordinates[0] &&
              this.coordinates[1] === this.moves[0].coordinates[1]){
                this.bearing = this.moves[0].bearing
                this.moves.shift()
            }
          }
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
        	<div class="tail" id="tail-${this.id}" style="left: ${this.coordinates[0]}px; top: ${this.coordinates[1]}px">
            </div>
        	`
        }
        static removeAll() {
            $('.tail').remove()
        }

    }
})()
