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
  })

  describe('objects', () => {
    it('parses an empty object', () => {
      expect(parse('{}')).toEqual({})
    })

    it('parses an object with a single key-value pair', () => {
      expect(parse('{"key": "value"}')).toEqual({ key: 'value' })
    })

    it('parses an object with multiple key-value pairs', () => {
      expect(parse('{"key1": "value1", "key2": 42}')).toEqual({
        key1: 'value1',
        key2: 42,
      })
    })

    it('parses 3 level nested objects', () => {
      const parsed = parse(
        '{"outerKey": {"innerKey": {"innerInnerKey": "innerInnerValue"}}}'
      )

      expect(parsed).toEqual({
        outerKey: { innerKey: { innerInnerKey: 'innerInnerValue' } },
      })
    })

    it('throws an error for invalid objects', () => {
      expect(() => parse('{"key": "value"')).toThrow()
    })
  })

  describe('arrays', () => {
    it('parses an empty array', () => {
      expect(parse('[]')).toEqual([])
    })

    it('parses an array of primitives', () => {
      expect(parse('[true, false, null, 42, "hello"]')).toEqual([
        true,
        false,
        null,
        42,
        'hello',
      ])
    })

    it('parses a nested array', () => {
      expect(parse('[1, [2, 3], 4]')).toEqual([1, [2, 3], 4])
    })

    it.skip('parses an array of objects', () => {
      expect(parse('[{"key1": "value1"}, {"key2": "value2"}]')).toEqual([
        { key1: 'value1' },
        { key2: 'value2' },
      ])
    })

    it.skip('throws an error for invalid arrays', () => {
      expect(() => parse('[1, 2,')).toThrow()
    })
  })
})
