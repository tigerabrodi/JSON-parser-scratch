import { describe, expect, it } from 'vitest'

import { parse } from './parse'

describe('JSON parse from scratch', () => {
  describe('primitive types', () => {
    it('parses null', () => {
      expect(parse('null')).toBe(null)
    })

    it('parses true', () => {
      expect(parse('true')).toBe(true)
    })

    it('parses false', () => {
      expect(parse('false')).toBe(false)
    })

    it('parses numbers', () => {
      expect(parse('42')).toBe(42)
    })

    it('parses strings', () => {
      expect(parse('"hello"')).toBe('hello')
    })

    it('throws an error for invalid string', () => {
      expect(() => parse('hello')).toThrow()
    })
  })

  describe.skip('objects', () => {
    it('parses an empty object', () => {
      expect(parse('{}')).toEqual({})
    })

    // it('parses an object with a single key-value pair', () => {
    //   expect(parse('{"key": "value"}')).toEqual({ key: 'value' })
    // })

    // it('parses an object with multiple key-value pairs', () => {
    //   expect(parse('{"key1": "value1", "key2": 42}')).toEqual({
    //     key1: 'value1',
    //     key2: 42,
    //   })
    // })

    // it('parses nested objects', () => {
    //   expect(parse('{"outerKey": {"innerKey": "innerValue"}}')).toEqual({
    //     outerKey: { innerKey: 'innerValue' },
    //   })
    // })

    // it('throws an error for invalid objects', () => {
    //   expect(() => parse('{"key": "value"')).toThrow()
    // })
  })
})
