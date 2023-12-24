// building JSON parse from scratch

const NUMBER_REGEX = /^-?\d+(\.\d+)?$/

function isNumber(value: string): boolean {
  return NUMBER_REGEX.test(value)
}

function parseString(input: string): string {
  // Check for starting and ending quotes
  if (input.startsWith('"') && input.endsWith('"')) {
    return input.slice(1, -1)
  }

  throw new Error('Invalid string')
}

export function parse(input: string) {
  if (input === 'null') return null
  if (input === 'true') return true
  if (input === 'false') return false
  if (isNumber(input)) return Number(input)

  return parseString(input)
}
