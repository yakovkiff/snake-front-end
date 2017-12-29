class SnakeHead {

    constructor(bearing = 'down', coordinates = [15, 15], moves = []) {
      this.bearing = bearing
      this.coordinates = coordinates
      this.moves = moves
      this.tailBlocks = []
      this.bearingChangeChecker = false
    }

    coordinatesAndBearing() {
      return {coordinates: this.coordinates, bearing: this.bearing}
    }

    tailCoordinatesAndBearing() {
      return this.tailBlocks.map(tailBlock => tailBlock.coordinatesBearingAndMoves())
    }

    hasMadeMoveAfterGrowingTail() {
      return typeof this.tailBlocks[0].nextMoveIndex === 'number'
    }

    recordMove() {
      this.moves.push({coordinates: this.coordinates.slice(), bearing: this.bearing.slice()})
      this.bearingChangeChecker = true
      if (this.tailBlocks.length > 0 && !this.hasMadeMoveAfterGrowingTail()) {
        this.tailBlocks.forEach(tail => tail.nextMoveIndex = this.moves.length - 1)
      }
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
      // allows bearing to be changeable since the snakeHead has moved
      this.bearingChangeChecker = false
    }

    advanceTail() {
      this.tailBlocks.forEach(tailBlock => tailBlock.advance())
    }

    tailSize() {
        return this.tailblocks.length
    }

    render() {
    	// let renderHTML =
    	return `
    	<div class="head" id="head" style="left: ${this.coordinates[0]}px; top: ${this.coordinates[1]}px">
        </div>
    	`
    }

    renderTail() {
      return this.tailBlocks.map(tail => tail.render()).join('')
    }

    remove() {
      $('#head').remove()
    }

}
