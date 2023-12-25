import { CLOSE_BRACE, OPEN_BRACE, parse } from './parse'

export function parseObject(input: string) {
  if (input === '{}') return {}

  const obj: Record<string, unknown> = {}
  let currentDepth = 0 // 1 means we are at the root level. 0 means we are outside of the object. We'll be at either 1 or 0 at any given time, because we're only parsing one object at a time. We do this by recursively calling parseObject().
  let keyStartIndex = -1
  let valueStartIndex = -1
  let isInString = false
  let currentKey = ''

  for (let i = 0; i < input.length; i++) {
    const currentChar = input[i]

    const isCurrentCharString = currentChar === '"'
    if (isCurrentCharString) {
      isInString = toggleIsInString(isInString)

      // Exiting or entering a string.
      const isExitingString = isInString === false
      if (isExitingString) {
        // What: Check if we've just finished reading a key.
        // Why: To extract and set the current key.
        if (keyStartIndex !== -1 && currentKey === '') {
          currentKey = extractKey(input, keyStartIndex, i)
        }
      } else {
        // What: Mark the start index of a key.
        // Why: To know where to start extracting the key.
        // Entering a string.
        keyStartIndex = i
      }
      continue
    }

    if (isInString) continue

    // What: Check if we are entering a new object.
    // Why: To increment the depth indicating a new level of nesting.
    const isCurrentCharOpenBrace = currentChar === OPEN_BRACE
    if (isCurrentCharOpenBrace) {
      currentDepth++
      continue
    }

    // What: Check if we are exiting an object.
    // Why: To decrement the depth and process the completed object or value.
    const isCurrentCharCloseBrace = currentChar === CLOSE_BRACE
    if (isCurrentCharCloseBrace) {
      currentDepth--

      // What: Check if we've reached the end of the object.
      // Why: To extract and assign the value to the current key, then reset for the next key-value pair.
      const isMarkingEndOfObject = currentDepth === 0
      if (isMarkingEndOfObject && currentKey) {
        const value = extractValue(input, valueStartIndex, i)
        obj[currentKey] = parseValue(value)
        currentKey = ''
      }
      continue
    }

    // What: Check if we've reached the separator between a key and its value.
    // Why: To mark the start of the value.
    const isMarkingStartOfValue = currentChar === ':' && currentDepth === 1
    if (isMarkingStartOfValue) {
      // Always set to a new value, that's why we're not resetting it elsewhere.
      valueStartIndex = i + 1 // +1 to skip the colon, this would be like ` "somestring"` where whitespace is the start, but we trim it later.
      continue
    }

    // What: Check if we've reached the end of a value at the root level.
    // Why: To extract and assign the value to the current key, then reset for the next key-value pair.
    const areWeEndOfValue = currentChar === ',' || currentChar === '}'
    if (areWeEndOfValue && currentDepth === 1) {
      const value = extractValue(input, valueStartIndex, i)
      obj[currentKey] = parseValue(value)
      currentKey = ''
    }
  }

  return obj
}

function toggleIsInString(isInString: boolean) {
  return !isInString
}

function extractKey(input: string, start: number, end: number) {
  // trim needed to remove spaces around the key.
  // +1 needed to skip quote
  // end does not need -1 because substring does not include the end index, it goes up to but not including the end index.
  return input.substring(start + 1, end).trim()
}

function extractValue(input: string, start: number, end: number) {
  // trim needed to remove spaces around the value.
  // end would be comma or closing bracket, so we get value up to that point, the value may have space so we trim it.
  return input.substring(start, end).trim()
}

function parseValue(value: string) {
  // if object, parse it recursively
  return value.startsWith('{') ? parseObject(value) : parse(value)
}
