const fs = require('fs')
const _ = require('lodash')
const data: string[] = fs.readFileSync(__dirname + '/data.txt', 'utf8').split('\n')

data.shift()

type Tree = { [key: string]: number | Tree }
const tree: Tree = {}
let cursor = '/'

for (const io of data) {
  // input
  if (io.startsWith('$')) {
    const [$, cmd, path] = io.split(' ')
    if (cmd === 'cd') {
      if (path === '..') {
        cursor = cursor.slice(0, cursor.lastIndexOf('.'))
      } else {
        cursor += '.' + path
      }
    }
  }
  // output
  else {
    const [fileSize, fileName] = io.split(' ')
    _.set(tree, `${cursor}.${fileName.replace('.', '_')}`, Number(fileSize))
  }
}

const computeSizes = (obj: Tree) => {
  let size = 0
  for (const value of Object.values(obj)) {
    if (typeof value === 'number') size += value
    if (typeof value === 'object') size += computeSizes(value)
  }
  obj.SIZE = size
  return size
}
computeSizes(tree)
// console.dir(tree, { depth: null })

const countTotalSizes = (obj: Tree) => {
  let total = 0
  for (const [key, value] of Object.entries(obj)) {
    if (key === 'SIZE' && value <= 100000) total += value as number
    if (typeof value === 'object') total += countTotalSizes(value)
  }
  return total
}
const total = countTotalSizes(tree)
console.log('Part A: ' + total)

// Part B
const TOTAL_SPACE = 70000000
const MIN_UNUSED_SPACE = 30000000
const CUR_UNUSED_SPACE = TOTAL_SPACE - (tree.SIZE as number)
const DIF_UNUSED_SPACE = MIN_UNUSED_SPACE - CUR_UNUSED_SPACE

const dirSizes = []
const findMinDirCandidates = (obj) => {
  for (const [key, value] of Object.entries(obj)) {
    if (key === 'SIZE' && value >= DIF_UNUSED_SPACE) dirSizes.push(value)
    if (typeof value === 'object') findMinDirCandidates(value)
  }
}
findMinDirCandidates(tree)

const minDirSize = Math.min(...dirSizes)
console.log('Part B: ' + minDirSize)
