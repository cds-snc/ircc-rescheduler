import { theme, incrementColor } from '../styles'

it('Test the styling function incrementColor that darkens or lightens the arithmetically', () => {
  const color = incrementColor(theme.colour.gray, 20)
  expect(color).toEqual('#5e5e5e')
})

it('Test the styling function incrementColor that darkens the color arithmetically', () => {
  const color = incrementColor(theme.colour.gray, -20)
  expect(color).toEqual('#363636')
})
