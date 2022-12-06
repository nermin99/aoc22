const fs = require('fs')

const data: string[][] = fs
  .readFileSync(__dirname + '/data.txt', 'utf8')
  .split('\n')
  .map((row) => row.split(' '))

const p1 = {
  A: 'rock',
  B: 'paper',
  C: 'scissors',
}

const p2 = {
  X: 'lose',
  Y: 'draw',
  Z: 'win',
}

const values = {
  rock: 1,
  paper: 2,
  scissors: 3,
}

const results = {
  lose: 0,
  draw: 3,
  win: 6,
}

let p2score = 0
for (const row of data) {
  const [p1move, p2move] = row
  const p1shape = p1[p1move]
  const p2result = p2[p2move]

  let p2shape
  let result
  if (p1shape === 'rock') {
    switch (p2result) {
      case 'lose': // lose
        p2shape = 'scissors'
        result = 'lose'
        break
      case 'draw': // draw
        p2shape = 'rock'
        break
      case 'win': // win
        p2shape = 'paper'
        break
    }
  }

  if (p1shape === 'paper') {
    switch (p2result) {
      case 'lose': // lose
        p2shape = 'rock'
        break
      case 'draw': // draw
        p2shape = 'paper'
        break
      case 'win': // win
        p2shape = 'scissors'
        break
    }
  }

  if (p1shape === 'scissors') {
    switch (p2result) {
      case 'lose': // lose
        p2shape = 'paper'
        break
      case 'draw': // draw
        p2shape = 'scissors'
        break
      case 'win': // win
        p2shape = 'rock'
        break
    }
  }
  p2score += values[p2shape] + results[p2result]
}
console.log(p2score)
