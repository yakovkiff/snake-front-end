const Tail = (function(){
    let tailBlocks = []
    let idCounter = 0
    return class Tail {
        constructor(snakeHead) {
            this.snakeHead = snakeHead
            // this.snakeHead.snakeTailBlocks.push(this)
            if (tailBlocks.length === 0) {
              this.moves = []
            }
            else {
              this.moves = tailBlocks[tailBlocks.length - 1].moves.slice()
            }
            this.setBearingAndCoordinates()
            tailBlocks.push(this)
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
                  this.coordinates[1] += 30
                  break;

              case "right":
                  this.coordinates[0] -= 30
                  break;

              case "down":
                  this.coordinates[1] -= 30
                  break;

              case "left":
                  this.coordinates[0] += 30
                  break;
              }

        }


        // at(x, y) {
        //     this.coordinates = [x, y];
        // }
        static advanceAll() {
          tailBlocks.forEach(tailBlock => tailBlock.advance())
        }

        advance() {

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
        static deleteAll() {
            $('.tail').remove()
        }

    }
})()
