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

function parseArray(input: string) {
  const arrayContent = input.slice(1, -1)

  console.log('arrayContent', arrayContent) // -> '1, [2, 3], 4'

  const splitByComma = arrayContent.split(',')

  console.log('splitByComma', splitByComma) // -> ['1', ' [2', ' 3]', ' 4']

  const trimmedElements = splitByComma.map((element) => element.trim()) // -> ['1', '[2', '3]', '4']

  console.log('trimmedElements', trimmedElements)

  const arrayElements: Array<unknown> = []
  let temp: Array<unknown> = []

  // Here we can't forget to parse the elements of the array
  trimmedElements.forEach((element) => {
    // Start of nested array
    if (element.startsWith('[')) {
      const elementWithoutOpenBracket = element.slice(1)
      temp.push(parse(elementWithoutOpenBracket))

      // End of nested array
    } else if (element.endsWith(']')) {
      const elementWithoutCloseBracket = element.slice(0, -1) // -1 removes the last element
      temp.push(parse(elementWithoutCloseBracket))
      arrayElements.push(temp)
      temp = []
    } else {
      arrayElements.push(parse(element))
    }
  })

  return arrayElements
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

  const isValidTopLevelArray = input.startsWith('[') && input.endsWith(']')
  if (isValidTopLevelArray) {
    return parseArray(input)
  }

  return parseString(input)
}
