const template = require('api.hbs')
const utils = require('./utils')

const data = {
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
      },
      "post": {
        "tags": [
          "admin-controller"
        ],
        "summary": "管理员修改密码",
        // "description": "管理员实体传帐号密码",
        "operationId": "changePasswordUsingPOST",
        "parameters": [
          {
            "in": "body",
            "name": "param",
            "description": "param",
            "required": true,
            "schema": {
              "$ref": "#/definitions/AdminParam"
            }
          }
        ]
      }
    },
    "/admin/getPassword": {
      "get": {
        "tags": [
          "admin-controller"
        ],
        "summary": "管理员获取密码",
        "operationId": "getPasswordUsingGET",
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

test('黑盒测试', () => {
  const tsCode = template({version: 'ts', ResponseType: 'any', ...data})
  const jsCode = template({version: 'js', ...data})
  const expectTsCode = `
    import axios from 'axios'

    export default {
      /** 管理员修改密码 */
      changePasswordUsingGET(id: string): any {
        return axios.get('/admin/changePassword', { params: { id } })
      },
      /** 管理员修改密码 */
      changePasswordUsingPOST(param: D.AdminParam): any {
        return axios.post('/admin/changePassword', param)
      },
      /** 管理员获取密码 */
      getPasswordUsingGET(id: string): any {
        return axios.get('/admin/getPassword', { params: { id } })
      }
    }
  `
  const expectJsCode = `
    import axios from 'axios'

    export default {
      /** 管理员修改密码 */
      changePasswordUsingGET(id) {
        return axios.get('/admin/changePassword', { params: { id } })
      },
      /** 管理员修改密码 */
      changePasswordUsingPOST(param) {
        return axios.post('/admin/changePassword', param)
      },
      /** 管理员获取密码 */
      getPasswordUsingGET(id) {
        return axios.get('/admin/getPassword', { params: { id } })
      }
    }
  `
  expect(tsCode).toBe(utils.format(expectTsCode))
  expect(jsCode).toBe(utils.format(expectJsCode))
})

test('无参测试', () => {
  const code = template({
    paths: {
      "/admin/changePassword": {
        "get": {
          "tags": [
            "admin-controller"
          ],
          "summary": "管理员修改密码",
          "operationId": "changePasswordUsingGET",
        },
        "post": {
          "tags": [
            "admin-controller"
          ],
          "summary": "管理员修改密码",
          // "description": "管理员实体传帐号密码",
          "operationId": "changePasswordUsingPOST",
          "parameters": []
        }
      }
    }
  })
  const expectCode = `
    import axios from 'axios'

    export default {
      /** 管理员修改密码 */
      changePasswordUsingGET() {
        return axios.get('/admin/changePassword')
      },
      /** 管理员修改密码 */
      changePasswordUsingPOST() {
        return axios.post('/admin/changePassword')
      }
    }
  `
  expect(code).toBe(utils.format(expectCode))
})
