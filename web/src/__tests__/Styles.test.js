import { theme, incrementColor } from '../styles'

it('Test the styling function incrementColor that darkens or lightens the arithmetically', () => {
  const color = incrementColor(theme.colour.gray, 20)
  expect(color).toEqual('#b8b8b8')
})

it('Test the styling function incrementColor that darkens the color arithmetically', () => {
  const color = incrementColor(theme.colour.gray, -20)
  expect(color).toEqual('#909090')
})
