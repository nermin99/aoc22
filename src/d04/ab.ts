const fs = require('fs')

const data: string[][] = fs
  .readFileSync(__dirname + '/data.txt', 'utf8')
  .split('\n')
  .map((row) => row.split(','))

let contains = 0
let overlaps = 0
for (const row of data) {
  const [first, second] = row
  const [firstMin, firstMax] = first.split('-').map(Number)
  const [secondMin, secondMax] = second.split('-').map(Number)

  // a
  if (firstMin <= secondMin && firstMax >= secondMax) contains++
  else if (secondMin <= firstMin && secondMax >= firstMax) contains++

  // b
  if (firstMin <= secondMin && firstMax >= secondMin) overlaps++
  else if (secondMin <= firstMin && secondMax >= firstMin) overlaps++
}

console.log(contains)
console.log(overlaps)
