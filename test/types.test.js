const template = require('types.hbs')
const utils = require('./utils')

test('types.d.ts 生成测试', () => {
  const code = template({definitions: {
    "Address": {
      "type": "object",
      "properties": {
        "address": {
          "type": "string"
        },
        "isA": {
          "type": "boolean"
        },
        "age": {
          "type": "number"
        },
        "admin": {
          "$ref": "#/definitions/AdminPo"
        },
      }
    },
  }})
  const expectCode = `
    declare namespace D {
      interface Address {
        address?: string
        isA?: boolean
        age?: number
        admin?: AdminPo
      }
    }
  `
  expect(code).toBe(utils.format(expectCode))
})
