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

    const insideObject = input.slice(1, -1) // '"key1": "value1", "key2": 42'

    // 1. split by comma -> ['"key1": "value1"', '"key2": 42']
    // 2. split by colon -> [['"key1"', ' "value1"'], ['"key2"', ' 42']]
    // 3. trim whitespace -> [['"key1"', '"value1"'], ['"key2"', '42']]
    const objectKeysValues = insideObject
      .split(',')
      .map((pair) => pair.split(':').map((part) => part.trim()))

    // 4. parse key and value -> [['key1', 'value1'], ['key2', 42]]
    // 5. reduce to object -> { key1: 'value1', key2: 42 }

    // How reduce works step by step:
    // const object = {}
    // object['key1'] = 'value1'
    // object['key2'] = 42
    // Both values for each key are parsed
    // We have to use `parse` for values because they can be of any type
    // return object
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
