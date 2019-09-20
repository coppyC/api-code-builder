import Typings, { jsdocTypedef } from "../src/Typing"

test('empty definitions', () => {
    const formatedCode = Typings({})
    expect(formatedCode).toEqual([])
})

test('defintion test', () => {
  const typing = Typings({
    AccountPo: {
      properties: {
        cardnumber: {
          type: "string"
        },
        paymentcode: {
          type: "string"
        }
      }
    }
  } as any)
  const expectCode = [
    'export interface AccountPo {',
    'cardnumber?: string',
    'paymentcode?: string',
    '}',
  ]
  expect(typing).toEqual(expectCode)
})

test('jsdoc test', () => {
  const typing = jsdocTypedef({
    AccountPo: {
      properties: {
        cardnumber: {
          type: "string"
        },
        paymentcode: {
          type: "string"
        }
      }
    }
  } as any)
  const expectCode = [
    '/**',
    ' * @typedef AccountPo',
    ' * @property {string} cardnumber',
    ' * @property {string} paymentcode',
    ' */',
  ]
  expect(typing).toEqual(expectCode)
})
