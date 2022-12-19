export const deepCopy = (m) => JSON.parse(JSON.stringify(m))

export const matrixBuild = (rows: number, cols: number, fill: any = '.') => {
  const matrix = Array(rows)
    .fill(fill)
    .map(() => Array(cols).fill(fill))
  // @ts-ignore
  matrix.__proto__.toString = function () {
    return this.map((row) => row.join('') + '\n').join('')
  }
  return matrix
}

export const matrixTranspose = (matrix: any[][]) =>
  matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]))

export const matrixRotateCW = (matrix: any[][]) =>
  matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]).reverse())

export const matrixRotateCCW = (matrix: any[][]) =>
  matrix[0].map((_, colIndex) => matrix.map((row) => row[row.length - 1 - colIndex]))

export const matrixFlipHorizontal = (matrix: any[][]) => matrix.reverse()

export const matrixFlipVertical = (matrix: any[][]) => matrix.map((row) => row.reverse())

export const matrixToString = (matrix: any[][]) =>
  matrix.map((row) => row.join(' ') + '\n').join('')
