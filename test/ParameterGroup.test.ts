import docs from './docs.json'
import ParameterGroup from '../src/ParameterGroup'

test('empty test', () => {
  const result = ParameterGroup([])
  expect(Object.keys(result)).toHaveLength(0)
})


test('group test', () => {
  const result = ParameterGroup([
    { "in": "path" },
    { "in": "query" },
    { "in": "body" },
  ] as any)
  expect(result.path).toHaveLength(1)
  expect(result.params).toHaveLength(1)
  expect(result.data).toBeDefined()
})

describe('param definition string', () => {
  const parameterGroup = ParameterGroup([
    {
      "in": "path",
      "name": "id",
      "description": "param",
      "required": true,
      "type": "integer"
    },
    {
      "in": "query",
      "name": "name",
      "description": "param",
      "required": false,
      "type": "string"
    },
    {
      "in": "body",
      "name": "param",
      "description": "param",
      "required": true,
      "schema": {
        "$ref": "#/definitions/AccountParam"
      }
    }
  ] as any)
  test('js version', () => {
    const result = ParameterGroup.string(parameterGroup, 'Test', 'js')
    expect(result).toBe('path, params, data')
  })
  test('ts version', () => {
    const result = ParameterGroup.string(parameterGroup, 'Test', 'ts')
    expect(result).toBe('path: TestPath, params: TestParams, data: AccountParam')
  })
})
