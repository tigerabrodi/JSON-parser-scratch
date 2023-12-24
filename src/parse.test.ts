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

    //     it('parses strings', () => {
    //       expect(parse('"hello"')).toBe('hello')
    //     })
  })
})
