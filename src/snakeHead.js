class SnakeHead {

    constructor(bearing = 'down', coordinates = [15, 15]) {
        this.bearing = bearing
        this.coordinates = coordinates
        this.snakeTailBlocks = []
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

    // tailBlocks() {
    //     this.snakeTailBlocks
    // }

    render() {
    	// let renderHTML =
    	return `
    	<div class="head" id="head" style="left: ${this.coordinates[0]}px; top: ${this.coordinates[1]}px">
        </div>
    	`
    }

    delete() {
        $('#head').remove()
    }

}
