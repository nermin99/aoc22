const fs = require('fs')

const data: string[] = fs.readFileSync(__dirname + '/data.txt', 'utf8').split('\n')

// A ∩ B ∩ ...
const intersect = (setA, setB, ...args) => {
  const result = new Set([...setA].filter((i) => setB.has(i)))
  if (args.length === 0) return result
  return intersect(result, args.shift(), ...args)
}

const getPriority = (letter) => {
  if (letter === letter.toUpperCase()) {
    return letter.charCodeAt(0) - ('A'.charCodeAt(0) - 1) + 26
  } else {
    return letter.charCodeAt(0) - ('a'.charCodeAt(0) - 1)
  }
}

function a() {
  let sum = 0
  for (const row of data) {
    const midIdx = Math.floor(row.length / 2)
    const left = row.slice(0, midIdx)
    const right = row.slice(midIdx)

    const leftSet = new Set(left)
    const rightSet = new Set(right)

    const common = intersect(leftSet, rightSet)
    const priority = getPriority([...common][0])
    sum += priority
  }
  console.log(sum)
}

function b() {
  let sum = 0
  for (let i = 0; i < data.length; i += 3) {
    const common = intersect(new Set(data[i]), new Set(data[i + 1]), new Set(data[i + 2]))
    const priority = getPriority([...common][0])
    sum += priority
  }
  console.log(sum)
}

a()
b()
