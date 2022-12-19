import { matrixBuild, matrixRotateCCW } from '../helpers'

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

const tailPositions = new Set<string>()

let head = '0,0'
let tail = '0,0'
tailPositions.add(tail)

const printPositions = (positions, tail = true) => {
  const maxX = Math.max(...[...positions].map((row) => row.split(',')[0])) + 1
  const maxY = Math.max(...[...positions].map((row) => row.split(',')[1])) + 1
  const matrix = matrixBuild(maxX, maxY)

  for (const [x, y] of [...positions].map((row) => row.split(',').map(Number))) {
    matrix[x][y] = tail ? '#' : 'H'
  }

  console.log((tail ? '--tail--' : '--head--') + '\n' + matrixRotateCCW(matrix).toString())
}

const updateTail = (hx: number, hy: number) => {
  let [tx, ty] = tail.split(',').map(Number)

  // return early if head is only max 1 space away horizontally or vertically from tail
  if (Math.abs(hx - tx) + Math.abs(hy - ty) <= 1) return

  // return early if head is only max 1 space away diagonally from tail
  if (Math.abs(hx - tx) === 1 && Math.abs(hy - ty) === 1) return

  if (hx > tx) tx++
  if (hx < tx) tx--
  if (hy > ty) ty++
  if (hy < ty) ty--
  tail = `${tx},${ty}`
  tailPositions.add(tail)

  // printPositions(tailPositions)
}

for (const [dir, n] of data) {
  let [hx, hy] = head.split(',').map(Number)
  const [dx, dy] = dirMap[dir]

  for (let i = 0; i < n; i++) {
    hx += dx
    hy += dy
    head = `${hx},${hy}`
    updateTail(hx, hy)
  }
}

// printPositions(tailPositions)
console.log(tailPositions.size)
