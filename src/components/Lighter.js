export class Lighter {
  playBoard;
  position;
  init = null
  stop = false
  constructor (init = {
    playBoardInit: [[1, 1, 1], [1, 0, 0], [1, 1, 2]],
    positionX: 0,
    positionY: 2,
    positionFace: 'left'
  }) {
    this.init = init
    this.backToStartPoint()
  }
  mainFunc = [];
  subFunc = [];
  activeStepId = -1;
  stepCount = 0;
  async run () {
    return new Promise(resolve => {
      this.stop = false
      this.backToStartPoint()
      setTimeout(async () => {
        this.stepCount = 0
        for (let i = 0; i < this.mainFunc.length; i++) {
          const step = this.mainFunc[i]
          this.activeStepId = step.id
          this.stepCount++
          await this.runStep(step)
        }
        this.activeStepId = -1
        resolve()
      }, 500)
    })
  }
  goAhead () {
    const aheadPointPosition = this.position.getAheadPointPosition()
    const aheadPoint = this.playBoard.getPoint(aheadPointPosition.x, aheadPointPosition.y)
    if (aheadPoint && aheadPoint.type !== 0) this.position.goTo(aheadPointPosition.x, aheadPointPosition.y)
  }
  lightUp () {
    const lightPoint = this.playBoard.getPoint(this.position.x, this.position.y)
    if (lightPoint) lightPoint.lightUp()
  }
  async runSubFunc () {
    return new Promise(resolve => {
      setTimeout(async () => {
        for (let i = 0; i < this.subFunc.length; i++) {
          const step = this.subFunc[i]
          this.activeStepId = step.id
          this.stepCount++
          await this.runStep(step)
        }
        resolve()
      }, 500)
    })
  }
  async runStep (step) {
    return new Promise(async resolve => {
      if (this.stop) return resolve()
      switch (step.type) {
        case 'goAhead':
          this.goAhead()
          break
        case 'turnLeft':
          this.position.turnLeft()
          break
        case 'turnRight':
          this.position.turnRight()
          break
        case 'lightUp':
          this.lightUp()
          break
        case 'subFunc':
          await this.runSubFunc()
          break
        default:
          break
      }
      setTimeout(() => {
        resolve()
      }, 500)
    })
  }
  backToStartPoint () {
    this.playBoard = new PlayBoard(this.init.playBoardInit)
    this.position = new Position(this.init.positionX, this.init.positionY, this.init.positionFace)
  }
  checkWin () {
    let isWin = true
    this.playBoard.pointMatrix.forEach(row => {
      row.forEach(col => {
        if (col.type === 2 && !col.isLighted) {
          isWin = false
        }
      })
    })
    return isWin
  }
}

class PlayBoard {
  pointMatrix = []
  constructor (playBoardInit) {
    this.reset(playBoardInit)
  }
  reset (playBoardInit) {
    playBoardInit.forEach((row, x) => {
      let matrixRow = []
      row.forEach((col, y) => {
        matrixRow.push(new Point(col, x, y))
      })
      this.pointMatrix.push(matrixRow)
    })
  }
  getPoint (x, y) {
    if (!this.pointMatrix[x]) return null
    return this.pointMatrix[x][y]
  }
}

class Point {
  type = 0;
  isLighted = false;
  id = 0;
  x = 0;
  y = 0;
  static pointId = 0;
  constructor (type, x, y) {
    this.id = Point.pointId++
    this.x = x
    this.y = y
    this.type = type
  }
  lightUp () {
    if (this.type === 2) this.isLighted = true
  }
}

class Position {
  x = 0;
  y = 0;
  face = 'left';
  constructor (x = 0, y = 0, face = 'left') {
    this.face = face
    this.goTo(x, y)
  }
  goTo (x, y) {
    this.x = x
    this.y = y
  }
  getAheadPointPosition () {
    if (this.face === 'up') return {x: this.x - 1, y: this.y}
    if (this.face === 'down') return {x: this.x + 1, y: this.y}
    if (this.face === 'left') return {x: this.x, y: this.y - 1}
    if (this.face === 'right') return {x: this.x, y: this.y + 1}
  }
  turnLeft () {
    const directions = ['up', 'right', 'down', 'left']
    let turnLeftIndex = directions.indexOf(this.face) - 1
    if (turnLeftIndex < 0) turnLeftIndex = 3
    this.face = directions[turnLeftIndex]
  }
  turnRight () {
    const directions = ['up', 'right', 'down', 'left']
    let turnRightIndex = directions.indexOf(this.face) + 1
    if (turnRightIndex > 3) turnRightIndex = 0
    this.face = directions[turnRightIndex]
  }
}

export class Step {
  id = 0;
  static stepId = 0;
  type = 'goAhead';
  constructor (type) {
    this.id = Step.stepId++
    this.type = type
  }
}
