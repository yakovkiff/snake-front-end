class SnakeHead {

    constructor(bearing = 'down', coordinates = [15, 15], moves = []) {
      this.bearing = bearing
      this.coordinates = coordinates
      this.moves = moves
      this.tailBlocks = []
      this.bearingChangeChecker = false
    }

    coordinatesBearingAndMoves() {
      return {coordinates: this.coordinates, bearing: this.bearing, moves: this.moves}
    }

    tailCoordinatesBearingAndNextMoveIndex() {
      return this.tailBlocks.map(tailBlock => tailBlock.coordinatesBearingAndNextMoveIndex())
    }

    hasMadeMoveAfterGrowingTail() {
      //does the tail block have a number in its index? default value == null
      return typeof this.tailBlocks[0].nextMoveIndex === 'number'
    }

    recordMove() {
      this.moves.push({coordinates: this.coordinates.slice(), bearing: this.bearing.slice()})

      //means that you can't turn twice in the same spot and game the system
      this.bearingChangeChecker = true

      //if the snake has tailblocks AND
      //it has not yet made a move after growing the tail
      if (this.tailBlocks.length > 0 && !this.hasMadeMoveAfterGrowingTail()) {
        // then give each tail block the index of the last move
        // (other moves happened before this tail piece existed)
        // This line will only be executed ONCE b/c conditions will only be met 1x
        this.tailBlocks.forEach(tail => tail.nextMoveIndex = this.moves.length - 1)
      }
    }

    trimMovesBeforeSaving() {
      const minMovesIndex = this.tailBlocks[this.tailBlocks.length - 1].nextMoveIndex
      const maxMovesIndex = this.moves.length - 1
      this.moves = this.moves.slice(minMovesIndex)
      this.tailBlocks.forEach(tail => tail.nextMoveIndex -= minMovesIndex)
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
