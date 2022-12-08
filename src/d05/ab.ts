const fs = require('fs')

const data: string = fs.readFileSync(__dirname + '/data.txt', 'utf8')

const startStacks = data.split('\n\n')[0]
const instructions = data.split('\n\n')[1].split('\n')

const stackRows = startStacks.split('\n')
const stackNrs = stackRows.pop().trim().split(/\s+/).map(Number)

const stacks: Map<number, string[]> = new Map()

function initStacks(_stacks: typeof stacks) {
  for (const nr of stackNrs) {
    const stack = []
    for (const row of stackRows) {
      const idx = nr === 1 ? nr : 1 + 4 * (nr - 1)
      const char = row.charAt(idx)
      if (char.match(/[a-z]/i)) stack.push(char)
    }
    _stacks.set(nr, stack.reverse())
  }
}
initStacks(stacks)

function followInstructions(_stacks: typeof stacks, isPartB = false) {
  const regxp = /move (\d+) from (\d+) to (\d+)/

  for (const instruction of instructions) {
    const [, n, from, to] = regxp.exec(instruction).map(Number)
    move(_stacks, n, from, to, isPartB)
  }
}
followInstructions(stacks)

function move(_stacks: typeof stacks, n: number, from: number, to: number, isPartB = false) {
  const fromStack = _stacks.get(from)
  const newFromStack = fromStack.slice(0, -n)
  const moveStack = fromStack.slice(-n)

  const toStack = _stacks.get(to)
  toStack.push(...(isPartB ? moveStack : moveStack.reverse()))
  _stacks.set(from, newFromStack)
  _stacks.set(to, toStack)
}

const a = [...stacks.values()].reduce((acc, stack) => acc + stack.at(-1), '')
console.log(a)

// Part B
const stacksB: typeof stacks = new Map()
initStacks(stacksB)
followInstructions(stacksB, true)
const b = [...stacksB.values()].reduce((acc, stack) => acc + stack.at(-1), '')
console.log(b)
