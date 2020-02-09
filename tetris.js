//  canvas variable to get the canvas element from the DOM(wheere we are going to draw) and ctxt(we are goona keep all the functions to draw on canvas) variable to get the context of the canvas.
let canvas
let ctx
// game board height and width
let gBAttayHeight = 20
let gBAttayWidth = 12
// start drowing shapes at coordinates [4,0]
let startX = 4
let startY = 0
// lookup table that contains x,y and we can draw boxes on this coordinates.
let coordinateArray = [...Array(gBAttayHeight)].map(e => Array(gBAttayWidth).fill(0))

// create tetromino
let curTetromino = [[1,0], [0,1], [1,1], [2,1]]


// array that contains all the tetraminos
let tetraminos = []
let tetraminoColors =  ['purple', 'cyan', 'blue', 'yellow', 'orange', 'green', 'red']
let curTetrominoColor

let gameBoardArray = [...Array(gBAttayHeight)].map(e => Array(gBAttayWidth).fill(0))

let DIRECTION = {
  IDLE: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3
}

let direction

// the class to match up with our coordinate array
class Coordinates {
  constructor(x,y) {
    this.x = x
    this.y = y
  }
}

document.addEventListener('DOMContentLoaded', SetupCanvas)

// populate the array coordinates
function CreateCoordArray() {
  let i = 0, j = 0;
  for (let y = 9; y <= 446; y += 23) {
    for (let x = 11; x <= 264; x += 23) {
      coordinateArray[i][j] = new Coordinates(x,y)
      i++
    }
    j++
    i = 0
  }
}
// function to setup canvas and context fundtions

function SetupCanvas() {
  canvas = document.getElementById('tetris')
  ctx = canvas.getContext('2d')
  canvas.width = 936
  canvas.height = 956

  // ctx.scale(1.5,1.5)


  ctx.fillStyle = 'white'
  ctx.fillRect(0,0, canvas.width, canvas.height)

  ctx.strokeStyle = 'black'
  ctx.strokeRect(8, 8, 280, 462)

  document.addEventListener('keydown', handleKeyPress)
  CreateTetraminos()
  CreateTetamino()

  CreateCoordArray();
  DrawTetromino()
}

function DrawTetromino() {
  for(let i = 0; i < curTetromino.length; i++) {
    let x = curTetromino[i][0] + startX
    let y = curTetromino[i][1] + startY
    gameBoardArray[x][y] = 1
    let coorX = coordinateArray[x][y].x
    let coorY = coordinateArray[x][y].y
    ctx.fillStyle = curTetrominoColor;
    ctx.fillRect(coorX, coorY, 21, 21)
  }
}

function handleKeyPress(key) {
  if (key.keyCode === 65) {
    direction = DIRECTION.LEFT
    if(!HittingTheWall()) {
      DeleteTetromino()
      startX--
      DrawTetromino()
    }
  } else if (key.keyCode === 68) {
    if(!HittingTheWall()) {

      direction = DIRECTION.RIGHT
      DeleteTetromino()
      startX++
      DrawTetromino()
    }
  } else if (key.keyCode === 83) {
    direction = DIRECTION.DOWN
    DeleteTetromino()
    startY++
    DrawTetromino()
  }
}

function DeleteTetromino() {
  for (let i =0; i< curTetromino.length; i++) {
    let x = curTetromino[i][0] + startX
    let y  = curTetromino[i][1] + startY
    gameBoardArray[x, y] = 0
    let coorX = coordinateArray[x][y].x
    let coorY = coordinateArray[x][y].y
    ctx.fillStyle = 'white'
    ctx.fillRect(coorX, coorY, 21, 21)
  }
}

function CreateTetraminos() {
  // T shape
  tetraminos.push([[1,0], [0,1], [1,1], [2,1]])
  // I shape
  tetraminos.push([[0,0], [1,0], [2, 0], [3,0]])
  //  J shape
  tetraminos.push([[0,0], [0,1], [1,1], [2,1]])
  // Square shape
  tetraminos.push([[0,0], [1,0], [0,1], [1,1]])
  // L shape 
  tetraminos.push([[2,0], [0,1], [1,1], [2,1]])
  // S shape
  tetraminos.push([[1,0], [2,0], [0,1], [1,1]])
  // Z shape
  tetraminos.push([[0,0], [1,0], [1,1], [2,1]])
}

function CreateTetamino() {
  let randomTetromino = Math.floor(Math.random() * tetraminos.length)
  curTetromino = tetraminos[randomTetromino]
  curTetrominoColor = tetraminoColors[randomTetromino]
}

// Check if the Tetromino hits the wall
// Cycle through the squares adding the upper left hand corner
// position to see if the value is <= to 0 or >= 11
// If they are also moving in a direction that would be off
// the board stop movement
function HittingTheWall(){
  for(let i = 0; i < curTetromino.length; i++){
      let newX = curTetromino[i][0] + startX;
      if(newX <= 0 && direction === DIRECTION.LEFT){
          return true;
      } else if(newX >= 11 && direction === DIRECTION.RIGHT){
          return true;
      }  
  }
  return false;
}