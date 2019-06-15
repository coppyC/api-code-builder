const params = require('../src/helpers/params')

const MOCK_OPTIONS = {
  hash: {
    type: 'definition',
    version: 'ts'
  }
}
const MOCK_OPTIONS_JS = {
  hash: {
    type: 'definition',
    version: 'js'
  }
}

const MOCK_OPTIONS_USE_GET = {
  hash: {
    type: 'use',
    method: 'get'
  }
}

const MOCK_OPTIONS_USE_POST = {
  hash: {
    type: 'use',
    method: 'post'
  }
}

const paramters = [
  { // 0
    "in": "path",
    "name": "a",
    "required": true,
    "type": "string"
  },
  { // 1
    "in": "query",
    "name": "b",
    "required": true,
    "type": "boolean"
  },
  { // 2
    "in": "body",
    "name": "c",
    "required": true,
    "schema": { "$ref": "#/definitions/AdminPo" }
  },
  { // 3
    "in": "query",
    "name": "d",
    "required": false,
    "type": "boolean"
  },
  { // 4
    "in": "query",
    "name": "e",
    "required": false,
    "type": "boolean"
  },
  { // 5
    "in": "formData",
    "name": "f",
    "required": true,
    "type": "file"
  },
  { // 6
    "in": "formData",
    "name": "g",
    "required": false,
    "type": "string"
  },
]

const Query = name => Object.assign({}, paramters[1], {name})
const Fd = name => Object.assign({}, paramters[5], {name})

test('必要参数及顺序测试', () => {
  const example = paramters.slice(0, 3)
    .sort(() => Math.random()>0.5 ? 1 : -1)
  const paramString = params(example, MOCK_OPTIONS)
  const paramStringJsVer = params(example, MOCK_OPTIONS_JS)
  const paramStringUsePost = params(example, MOCK_OPTIONS_USE_POST)
  expect(paramString).toBe('a: string, c: D.AdminPo, b: boolean')
  expect(paramStringJsVer).toBe('a, c, b')
  expect(paramStringUsePost).toBe(', c, { params: { b } }')
})

describe('query 测试', () => {
  test('query 单可选测试', () => {
    const example = [paramters[3]]
    const paramString = params(example, MOCK_OPTIONS)
    const paramStringJsVer = params(example, MOCK_OPTIONS_JS)
    const paramStringJsUseGet = params(example, MOCK_OPTIONS_USE_GET)
    const paramStringJsUsePost = params(example, MOCK_OPTIONS_USE_POST)
    expect(paramString).toBe('d?: boolean')
    expect(paramStringJsVer).toBe('d')
    expect(paramStringJsUseGet).toBe(', { params: { d } }')
    expect(paramStringJsUsePost).toBe(', null, { params: { d } }')
  })
  test('query 多可选测试', () => {
    const example = paramters.slice(3, 5)
    const paramString = params(example, MOCK_OPTIONS)
    const paramStringJsVer = params(example, MOCK_OPTIONS_JS)
    const paramStringJsUseGet = params(example, MOCK_OPTIONS_USE_GET)
    expect(paramString).toBe('query?: { d?: boolean, e?: boolean }')
    expect(paramStringJsVer).toBe('query')
    expect(paramStringJsUseGet).toBe(', { params: query }')
  })
  test('query 必选混单可选测试', () => {
    const example = [paramters[1], paramters[3]]
    const paramString = params(example, MOCK_OPTIONS)
    const paramStringJsVer = params(example, MOCK_OPTIONS_JS)
    const paramStringJsUseGet = params(example, MOCK_OPTIONS_USE_GET)
    expect(paramString).toBe('b: boolean, d?: boolean')
    expect(paramStringJsVer).toBe('b, d')
    expect(paramStringJsUseGet).toBe(', { params: { b, d } }')
  })
  test('query 必选混多可选测试', () => {
    const example = [paramters[1], paramters[3], paramters[4]]
    const paramString = params(example, MOCK_OPTIONS)
    const paramStringJsVer = params(example, MOCK_OPTIONS_JS)
    const paramStringJsUseGet = params(example, MOCK_OPTIONS_USE_GET)
    expect(paramString).toBe('query: { b: boolean, d?: boolean, e?: boolean }')
    expect(paramStringJsVer).toBe('query')
    expect(paramStringJsUseGet).toBe(', { params: query }')
  })
  test('query 少量必选测试', () => {
    const example = [Query('a'), Query('b'), Query('c')]
    const paramString = params(example, MOCK_OPTIONS)
    const paramStringJsVer = params(example, MOCK_OPTIONS_JS)
    const paramStringJsUseGet = params(example, MOCK_OPTIONS_USE_GET)
    expect(paramString).toBe('a: boolean, b: boolean, c: boolean')
    expect(paramStringJsVer).toBe('a, b, c')
    expect(paramStringJsUseGet).toBe(', { params: { a, b, c } }')
  })
  test('query 大量必选测试(超过3个)', () => {
    const example = [Query('a'), Query('b'), Query('c'), Query('d')]
    const paramString = params(example, MOCK_OPTIONS)
    const paramStringJsVer = params(example, MOCK_OPTIONS_JS)
    const paramStringJsUseGet = params(example, MOCK_OPTIONS_USE_GET)
    expect(paramString).toBe('query: { a: boolean, b: boolean, c: boolean, d: boolean }')
    expect(paramStringJsVer).toBe('query')
    expect(paramStringJsUseGet).toBe(', { params: query }')
  })
})

describe('formData 测试', () => {
  test('必选单文件', () => {
    const example = [paramters[5]]  // 文件类型
    const paramString = params(example, MOCK_OPTIONS)
    const paramStringJsVer = params(example, MOCK_OPTIONS_JS)
    const paramStringJsUsePost = params(example, MOCK_OPTIONS_USE_POST)
    expect(paramString).toBe('f: any')
    expect(paramStringJsVer).toBe('f')
    expect(paramStringJsUsePost).toBe(', fd')
  })
  test('混可选', () => {
    const example = paramters.slice(5, 7)
    const paramString = params(example, MOCK_OPTIONS)
    const paramStringJsVer = params(example, MOCK_OPTIONS_JS)
    const paramStringJsUsePost = params(example, MOCK_OPTIONS_USE_POST)
    expect(paramString).toBe('formData: { f: any, g?: string }')
    expect(paramStringJsVer).toBe('formData')
    expect(paramStringJsUsePost).toBe(', fd')
  })
  test('大量必选测试(超过3个)', () => {
    const example = [Fd('a'), Fd('b'), Fd('c'), Fd('d')]
    const paramString = params(example, MOCK_OPTIONS)
    const paramStringJsVer = params(example, MOCK_OPTIONS_JS)
    expect(paramString).toBe('formData: { a: any, b: any, c: any, d: any }')
    expect(paramStringJsVer).toBe('formData')
  })
  test('混合 query 测试', () => {
    const example = [Query('a'), Fd('b'), Fd('c'), Fd('d')]
    const paramString = params(example, MOCK_OPTIONS)
    const paramStringJsVer = params(example, MOCK_OPTIONS_JS)
    const paramStringJsUsePost = params(example, MOCK_OPTIONS_USE_POST)
    expect(paramString).toBe('b: any, c: any, d: any, a: boolean')
    expect(paramStringJsVer).toBe('b, c, d, a')
    expect(paramStringJsUsePost).toBe(', fd, { params: { a } }')
  })
})
