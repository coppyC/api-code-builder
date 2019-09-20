import DataType from "../src/DataType"

test('string type', () => {
  const type =  DataType({type: 'string'})
  expect(type).toBe('string')
})
test('number type', () => {
  const type =  DataType({type: 'integer'})
  expect(type).toBe('number')
})

test('array type', () => {
  const type =  DataType({
    type: 'array',
    items: {
      type: 'integer'
    }
  })
  expect(type).toBe('number[]')
})

test('enum type', () => {
  const type = DataType({enum: [1,2,3,'4']})
  expect(type).toBe(`(1|2|3|'4')`)
})

test('hav ref', () => {
  const type = DataType({$ref: '#/sdfsdfwes/sdf/A@bcd@'})
  expect(type).toBe('Abcd')
})
