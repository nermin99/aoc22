const fs = require('fs')
const data = fs
  .readFileSync(__dirname + '/data.txt', 'utf8')
  .split('\n')
  .map((row) => {
    const res = row.split(' ')
    return [res[0], Number(res[1]) || null]
  })

const registers = new Map([['x', 1]])

const signals = [20, 60, 100, 140, 180, 220]

// const regxp = /add(\w+)/

let cycle = 1
const cycleMap = new Map()

for (const [op, nr] of data) {
  cycleMap.set(cycle, registers.get('x') || 1)

  if (op === 'noop') {
    cycle += 1
    continue
  }

  cycle += 2
  registers.set('x', (registers.get('x') ?? 0) + nr)
}

const filteredSignals = signals.map(
  (signal) => signal * (cycleMap.get(signal) ?? cycleMap.get(signal - 1))
)

const result = filteredSignals.reduce((acc, curr) => acc + curr, 0)
console.log(result)
