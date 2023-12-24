// building JSON parse from scratch
export function parse(input: string) {
  if (input === 'null') return null
  if (input === 'true') return true
  if (input === 'false') return false
  if (Number(input)) return Number(input)

  // Needed to remove the quotes from the string that come with the input
  // This removes the first and last character from the string
  // e.g. '"hello"' -> 'hello'
  // 1 means start at the second character
  // -1 means stop at the second to last character
  return input.slice(1, -1)
}
