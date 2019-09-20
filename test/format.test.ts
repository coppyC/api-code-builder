import format from "../src/format"

test('have the space indent',() => {
  const formatedCode = format([
    'interface X {',
    'a: string',
    'b: number',
    '}'
  ])
  const expectCode = [
    'interface X {',
    '  a: string',
    '  b: number',
    '}'
  ].join('\n')
  expect(formatedCode).toBe(expectCode)
})

test('end with ,',() => {
  const formatedCode = format([
    'interface X {',
    'a: string',
    'b: number',
    '},'
  ])
  const expectCode = [
    'interface X {',
    '  a: string',
    '  b: number',
    '},'
  ].join('\n')
  expect(formatedCode).toBe(expectCode)
})
