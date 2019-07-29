const template = require('../src/partials/header.hbs')

test('默认 header', () => {
  const code = template({})
  expect(code).toBe(`import axios from 'axios'\n`)
})

test('自定义 axios', () => {
  const code = template({axios: './myAxios'})
  expect(code).toBe(`import axios from './myAxios'\n`)
})
