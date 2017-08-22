const Tail = (function(){
    let tailBlocks = []
    return class Tail {
        constructor(snakeHead) {
            this.snakeHead = snakeHead
            // this.snakeHead.snakeTailBlocks.push(this)
            tailBlocks.push(this)
            this.setBearingAndCoordinates()
        }

        static tailBlocks(){
            return tailBlocks
        }

        static renderAll(){
            return this.tailBlocks().map(tail => tail.render()).join('')
        }

        setBearingAndCoordinates() {
            let tailBearing = ''
            if (tailBlocks.length === 1) {
                this.bearing = this.snakeHead.bearing
                this.coordinates = this.snakeHead.coordinates
            }
            else {
                this.bearing = this.constructor.tailBlocks().slice(-2, -1).bearing
                this.coordinates = this.constructor.tailBlocks().slice(-2, -1).coordinates
  
            }
            switch (this.bearing) {
            case "up":
                this.coordinates[1] -= 30
                break;

            case "right":
                this.coordinates[0] += 30
                break;

            case "down":
                this.coordinates[1] += 30
                break;

            case "left":
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
