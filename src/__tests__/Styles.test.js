import { theme, incrementColor } from '../styles'

it('Test the styling function incrementColor that darkens or lightens the arithmetically', () => {
  const color = incrementColor(theme.colour.gray, 20)
  expect(color).toEqual('#a2a2a2')
})

it('Test the styling function incrementColor that darkens the color arithmetically', () => {
  const color = incrementColor(theme.colour.gray, -20)
  expect(color).toEqual('#7a7a7a')
})
