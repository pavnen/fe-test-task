const X_SYMBOL = 'X'
const O_SYMBOL = 'O'
const EMPTY_SYMBOL = '-'

export const isEmptyCell = (cell: number | string) => typeof cell === "number"

export const getCellSymbol = (cell: number | string) => {
  switch (cell) {
    case 'O':
      return O_SYMBOL
    case 'X':
      return X_SYMBOL
    default:
      return EMPTY_SYMBOL
  }
}
