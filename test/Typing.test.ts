import Typings, { jsdocTypedef } from "../src/Typing"

test('empty definitions', () => {
    const formatedCode = Typings({})
    expect(formatedCode).toEqual([])
})

describe('typing', () => {
  test('definition test', () => {
    const typing = Typings({
      AccountPo: {
        type: 'object',
        properties: {
          cardnumber: {
            type: "string"
          },
          paymentcode: {
            type: "string"
          }
        }
      }
    })
    const expectCode = [
      'export interface AccountPo {',
      'cardnumber?: string',
      'paymentcode?: string',
      '}',
    ]
    expect(typing).toEqual(expectCode)
  })

  test('definition test: with desc', () => {
    const typing = Typings({
      AccountPo: {
        type: 'object',
        properties: {
          cardnumber: {
            type: "string",
            description: 'xxx',
          }
        }
      }
    })
    const expectCode = [
      'export interface AccountPo {',
      '/** xxx */',
      'cardnumber?: string',
      '}',
    ]
    expect(typing).toEqual(expectCode)
  })

  test('definition test: required', () => {
    const typing = Typings({
      AccountPo: {
        type: 'object',
        required: ['cardnumber'],
        properties: {
          cardnumber: {
            type: "string"
          }
        }
      }
    })
    const expectCode = [
      'export interface AccountPo {',
      'cardnumber: string',
      '}',
    ]
    expect(typing).toEqual(expectCode)
  })

})


describe('jsdoc test', () => {
  test('base test', () => {
    const typing = jsdocTypedef({
      AccountPo: {
        type: 'object',
        properties: {
          cardnumber: {
            type: "string"
          },
          paymentcode: {
            type: "string"
          }
        }
      }
    })
    const expectCode = [
      '/**',
      ' * @typedef AccountPo',
      ' * @property {string} [cardnumber]',
      ' * @property {string} [paymentcode]',
      ' */',
    ]
    expect(typing).toEqual(expectCode)
  })
  test('with desc', () => {
    const typing = jsdocTypedef({
      AccountPo: {
        type: 'object',
        properties: {
          cardnumber: {
            type: "string",
            description: 'xxx',
          }
        }
      }
    })
    const expectCode = [
      '/**',
      ' * @typedef AccountPo',
      ' * @property {string} [cardnumber] xxx',
      ' */',
    ]
    expect(typing).toEqual(expectCode)
  })
  test('with required', () => {
    const typing = jsdocTypedef({
      AccountPo: {
        type: 'object',
        required: ['cardnumber'],
        properties: {
          cardnumber: {
            type: "string",
          }
        }
      }
    })
    const expectCode = [
      '/**',
      ' * @typedef AccountPo',
      ' * @property {string} cardnumber',
      ' */',
    ]
    expect(typing).toEqual(expectCode)
  })
})
