// building JSON parse from scratch

import { parseObject } from './parseObject'

export function parseString(input: string) {
  // Function to extract a string, removing the surrounding quotes.
  return input.startsWith('"') && input.endsWith('"')
    ? input.slice(1, -1)
    : input
}

const NUMBER_REGEX = /^-?\d+(\.\d+)?$/

export const OPEN_BRACE = '{'
export const CLOSE_BRACE = '}'

function isNumber(value: string): boolean {
  return NUMBER_REGEX.test(value)
}

export function parse(input: string) {
  if (input === 'null') return null
  if (input === 'true') return true
  if (input === 'false') return false
  if (input === '') return ''
  if (input === ' ') return ' '
  if (input === '[]') return []
  if (isNumber(input)) return Number(input)

  const isValidTopLevelObject =
    input.startsWith(OPEN_BRACE) && input.endsWith(CLOSE_BRACE)
  if (isValidTopLevelObject) {
    return parseObject(input) // Parse the inner content of the object
  }

  const isInvalidTopLevelObject =
    input.startsWith(OPEN_BRACE) !== input.endsWith(CLOSE_BRACE)
  if (isInvalidTopLevelObject) {
    throw new Error('Invalid JSON')
  }

  return parseString(input)
}
