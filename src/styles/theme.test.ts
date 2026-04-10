import { test, expect } from 'vitest'
import { colors } from './theme'
import tailwindConfig from '../../tailwind.config'

// Feature: petalia-react-design-system, Property 6: Design token round-trip
test('Every color token in tailwind.config matches theme.ts export', () => {
  const twColors = (tailwindConfig.theme?.extend?.colors ?? {}) as Record<string, string>

  Object.entries(colors).forEach(([key, value]) => {
    expect(twColors[key]).toBe(value)
  })
})

test('Every tailwind color token is exported in theme.ts', () => {
  const twColors = (tailwindConfig.theme?.extend?.colors ?? {}) as Record<string, string>

  Object.keys(twColors).forEach((key) => {
    expect(colors).toHaveProperty(key)
  })
})
