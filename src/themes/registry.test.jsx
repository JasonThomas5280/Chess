import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { EMPIRE_THEMES, EMPIRE_IDS } from './registry.js'
import { PALETTE_KEYS } from './palettes.js'
import { PIECE_LETTERS } from './pieces/types.js'

describe('theme registry', () => {
  it('exposes all nine empires', () => {
    expect(EMPIRE_IDS).toHaveLength(9)
    for (const id of ['mali', 'songhai', 'kush', 'aksum', 'greatZimbabwe', 'benin', 'ashanti', 'zulu', 'egypt']) {
      expect(EMPIRE_IDS).toContain(id)
    }
  })

  it('each empire has a complete palette and metadata', () => {
    for (const id of EMPIRE_IDS) {
      const t = EMPIRE_THEMES[id]
      expect(t.name, id).toBeTruthy()
      expect(t.blurb, id).toBeTruthy()
      expect(t.region, id).toBeTruthy()
      for (const key of PALETTE_KEYS) {
        expect(t.palette[key], `${id}.${key}`).toMatch(/^#/)
      }
    }
  })

  it('each empire provides a full {k,q,r,b,n,p} piece set that renders', () => {
    for (const id of EMPIRE_IDS) {
      const set = EMPIRE_THEMES[id].pieces
      for (const letter of PIECE_LETTERS) {
        expect(set[letter], `${id}.${letter}`).toBeTruthy()
      }
      // Smoke-render every piece for both colors.
      for (const letter of PIECE_LETTERS) {
        const Comp = set[letter]
        for (const color of ['w', 'b']) {
          const { container, unmount } = render(<Comp color={color} />)
          expect(container.querySelector('svg'), `${id}.${letter}.${color}`).toBeTruthy()
          unmount()
        }
      }
    }
  })
})
