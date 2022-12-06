const fs = require('fs')

const data: number[][] = fs
  .readFileSync(__dirname + '/data.txt', 'utf8')
  .split('\n\n')
  .map((elf: string) => elf.split('\n').map(Number))

const sums = data.map((group) => group.reduce((acc, curr) => acc + curr, 0))

const bestElf = sums.indexOf(Math.max(...sums))
console.log(sums[bestElf])

const top3 = sums.sort((a, b) => b - a).slice(0, 3)
const top3sum = top3.reduce((acc, curr) => acc + curr, 0)
console.log(top3sum)
