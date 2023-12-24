// building JSON parse from scratch

const NUMBER_REGEX = /^-?\d+(\.\d+)?$/

const LEFT_BRACE = '{'
const RIGHT_BRACE = '}'

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

  if (input.startsWith(LEFT_BRACE) && input.endsWith(RIGHT_BRACE)) {
    if (input === '{}') return {}

    const insideObject = input.slice(1, -1)

    const objectKeysValues = insideObject
      .split(',')
      .map((pair) => pair.split(':').map((part) => part.trim()))

    return objectKeysValues.reduce<Record<string, unknown>>(
      (obj, [key, value]) => {
        obj[parseString(key)] = parse(value)
        return obj
      },
      {}
    )
  }

  return parseString(input)
}
