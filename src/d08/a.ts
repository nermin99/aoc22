const fs = require('fs')
const data: number[][] = fs
  .readFileSync(__dirname + '/data.txt', 'utf8')
  .split('\n')
  .map((row) => row.split('').map(Number))

const visibleTrees: string[] = []

const checkDirection = (data: number[][], i: number, j: number, di: number, dj: number) => {
  let k = 1
  while (data[i + k * di]?.[j + k * dj] !== undefined) {
    if (data[i + k * di][j + k * dj] >= data[i][j]) return false
    k++
  }
  return true
}

const isVisible = (data: number[][], i: number, j: number) => {
  if (i === 0 || j === 0 || i === data.length - 1 || j === data[0].length - 1) return true

  if (checkDirection(data, i, j, -1, 0)) return true // top
  if (checkDirection(data, i, j, 1, 0)) return true // bottom
  if (checkDirection(data, i, j, 0, -1)) return true // left
  if (checkDirection(data, i, j, 0, 1)) return true // right

  return false
}

for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[0].length; j++) {
    if (isVisible(data, i, j)) visibleTrees.push(`${i},${j}`)
  }
}

console.log(visibleTrees.length)
