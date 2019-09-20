import comment from "../src/comment"

test('zero line', () => {
  const code = comment([])
  expect(code).toEqual([])
})

test('one line', () => {
  const code = comment(['xxxx'])
  expect(code).toEqual(['/** xxxx */'])
})

test('many lines', () => {
  const code = comment([
    'xxxx',
    '@explain 66666',
  ])
  expect(code).toEqual([
    '/**',
    ' * xxxx',
    ' * @explain 66666',
    ' */',
  ])
})
