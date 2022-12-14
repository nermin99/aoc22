const fs = require('fs')

const data: string = fs.readFileSync(__dirname + '/data.txt', 'utf8')

function getNrChars(regxp: RegExp, length: number) {
  const res = regxp.exec(data)
  // const [match] = res
  const idx = res.index + length
  console.log(idx)
}

const regxpA = /(\w)(?!\1)(\w)(?!\1|\2)(\w)(?!\1|\2|\3)(\w)/
const regxpB =
  /(\w)(?!\1)(\w)(?!\1|\2)(\w)(?!\1|\2|\3)(\w)(?!\1|\2|\3|\4)(\w)(?!\1|\2|\3|\4|\5)(\w)(?!\1|\2|\3|\4|\5|\6)(\w)(?!\1|\2|\3|\4|\5|\6|\7)(\w)(?!\1|\2|\3|\4|\5|\6|\7|\8)(\w)(?!\1|\2|\3|\4|\5|\6|\7|\8|\9)(\w)(?!\1|\2|\3|\4|\5|\6|\7|\8|\9|\10)(\w)(?!\1|\2|\3|\4|\5|\6|\7|\8|\9|\10|\11)(\w)(?!\1|\2|\3|\4|\5|\6|\7|\8|\9|\10|\11|\12)(\w)(?!\1|\2|\3|\4|\5|\6|\7|\8|\9|\10|\11|\12|\13)(\w)/

getNrChars(regxpA, 4)
getNrChars(regxpB, 14)
