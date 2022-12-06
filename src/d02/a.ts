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
  X: 'rock',
  Y: 'paper',
  Z: 'scissors',
}

const values = {
  rock: 1,
  paper: 2,
  scissors: 3,
}

let p2score = 0
for (const row of data) {
  const [p1move, p2move] = row
  const p1shape = p1[p1move]
  const p2shape = p2[p2move]
  const p1value = values[p1shape]
  const p2value = values[p2shape]

  if (p1shape === 'rock') {
    switch (p2shape) {
      case 'rock': // draw
        p2score += p2value + 3
        break
      case 'paper': // win
        p2score += p2value + 6
        break
      case 'scissors': // lose
        p2score += p2value + 0
        break
    }
  }

  if (p1shape === 'paper') {
    switch (p2shape) {
      case 'paper': // draw
        p2score += p2value + 3
        break
      case 'scissors': // win
        p2score += p2value + 6
        break
      case 'rock': // lose
        p2score += p2value + 0
        break
    }
  }

  if (p1shape === 'scissors') {
    switch (p2shape) {
      case 'scissors': // draw
        p2score += p2value + 3
        break
      case 'rock': // win
        p2score += p2value + 6
        break
      case 'paper': // lose
        p2score += p2value + 0
        break
    }
  }
}
console.log(p2score)
