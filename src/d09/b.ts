const fs = require('fs')
const data: number[][] = fs
  .readFileSync(__dirname + '/data.txt', 'utf8')
  .split('\n')
  .map((row) => {
    const res = row.split(' ')
    return [res[0], Number(res[1])]
  })

const dirMap = {
  R: [1, 0],
  L: [-1, 0],
  U: [0, 1],
  D: [0, -1],
}

const nrKnots = 10
const positions = new Set<string>()

type Point = { x: number; y: number }
// const rope: Point[] = new Array(nrKnots).fill({ x: 0, y: 0 })
const rope: Point[] = []
while (rope.length < nrKnots) rope.push({ x: 0, y: 0 })

const head: Point = rope.at(0)
const tail: Point = rope.at(-1)

positions.add(`${tail.x},${tail.y}`)

const updateTail = (currKnot: Point, prevKnot: Point) => {
  let { x: hx, y: hy } = prevKnot
  let { x: tx, y: ty } = currKnot

  // return early if head is only max 1 space away horizontally or vertically from tail
  if (Math.abs(hx - tx) + Math.abs(hy - ty) <= 1) return

  // return early if head is only max 1 space away diagonally from tail
  if (Math.abs(hx - tx) === 1 && Math.abs(hy - ty) === 1) return

  if (hx > tx) currKnot.x++
  if (hx < tx) currKnot.x--
  if (hy > ty) currKnot.y++
  if (hy < ty) currKnot.y--

  if (currKnot === tail) positions.add(`${currKnot.x},${currKnot.y}`)
}

for (const [dir, n] of data) {
  const [dx, dy] = dirMap[dir]

  for (let i = 0; i < n; i++) {
    for (let knotIdx = 0; knotIdx < rope.length; knotIdx++) {
      const currKnot = rope[knotIdx]
      const prevKnot = currKnot === head ? null : rope[knotIdx - 1]

      if (currKnot === head) {
        currKnot.x += dx
        currKnot.y += dy
        continue
      }
      updateTail(currKnot, prevKnot)
    }
  }
}

// console.log(positions)
console.log(positions.size) // 2793
