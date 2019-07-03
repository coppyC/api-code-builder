const template = require('config.hbs')

const data = {
  host: "{{host}}",
  basePath: "{{basePath}}",
  definitions: {
    "User": {
      "properties": {
        "id": {
          "key": "id",
          "access": "r",
          "type": "number"
        }
      }
    }
  },
  paths: {
    "/admin/changePassword": {
      "get": {
        "tags": [
          "admin-controller"
        ],
        "summary": "管理员修改密码",
        "operationId": "changePasswordUsingGET",
        "parameters": [
          {
            "in": "query",
            "name": "id",
            "description": "param",
            "required": true,
            "type": "string"
          }
        ]
      }
    }
  }
}

test('不含冗余属性', () => {
  const config = JSON.parse(template(data))
  expect(config.version).toBeUndefined()
  expect(config.host).toBeDefined()
  expect(config.basePath).toBeDefined()
  expect(config.definitions).toBeDefined()
  expect(config.paths).toBeUndefined()
  const userIdProperty = config.definitions.User.properties.id
  expect(userIdProperty.key).toBeUndefined()
  expect(userIdProperty.access).toBeDefined()
})
