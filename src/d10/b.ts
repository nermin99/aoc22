import { matrixBuild } from '../helpers'

const fs = require('fs')
const data = fs
  .readFileSync(__dirname + '/data.txt', 'utf8')
  .split('\n')
  .map((row) => {
    const res = row.split(' ')
    return [res[0], Number(res[1]) || null]
  })

let registerX = 1

const signals = [20, 60, 100, 140, 180, 220]

let cycle = 1
const cycleRegisterMap = new Map()

for (const [op, nr] of data) {
  cycleRegisterMap.set(cycle, registerX)

  if (op === 'noop') {
    cycle += 1
    continue
  }

  cycle += 2
  registerX += nr
}

const filteredSignals = signals.map(
  (signal) => signal * (cycleRegisterMap.get(signal) ?? cycleRegisterMap.get(signal - 1))
)
const result = filteredSignals.reduce((acc, curr) => acc + curr, 0)
console.log(result) // 12840

const ROWS = 6
const COLS = 40
const matrix = matrixBuild(ROWS, COLS)

for (let i = 0; i < ROWS; i++) {
  for (let j = 0; j < COLS; j++) {
    const pixelPos = i * COLS + j
    const cycle = pixelPos + 1
    const register = cycleRegisterMap.get(cycle) ?? cycleRegisterMap.get(cycle - 1)
    if (Math.abs(pixelPos - (i * COLS + register)) <= 1) {
      matrix[i][j] = '#'
    }
  }
}

console.log(matrix.toString()) // ZKJFBJFZ
