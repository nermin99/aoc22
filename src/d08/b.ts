const fs = require('fs')
const data: number[][] = fs
  .readFileSync(__dirname + '/data.txt', 'utf8')
  .split('\n')
  .map((row) => row.split('').map(Number))

const scenicScores: number[] = []

const getViewingDistance = (
  data: number[][],
  i: number,
  j: number,
  di: number,
  dj: number
) => {
  let k = 1
  while (data[i + k * di]?.[j + k * dj] !== undefined) {
    if (data[i + k * di][j + k * dj] >= data[i][j]) return k
    k++
  }
  return k - 1
}

const getScenicScore = (data: number[][], i: number, j: number) => {
  if (i === 0 || j === 0 || i === data.length - 1 || j === data[0].length - 1) return 0

  let top = getViewingDistance(data, i, j, -1, 0) // top
  let bot = getViewingDistance(data, i, j, 1, 0) // bottom
  let lef = getViewingDistance(data, i, j, 0, -1) // left
  let rit = getViewingDistance(data, i, j, 0, 1) // right

  return top * bot * lef * rit
}

for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[0].length; j++) {
    scenicScores.push(getScenicScore(data, i, j))
  }
}

const maxScenicScore = Math.max(...scenicScores)
console.log(maxScenicScore)
