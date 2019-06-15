const pathResolve = require('../src/helpers/pathResolve')

test('无路径参数', () => {
  const code = pathResolve('/api/address/delete')
  expect(code).toBe(`'/api/address/delete'`)
})

test('有路径参数', () => {
  const code = pathResolve('/api/address/delete/{addressId}')
  expect(code).toBe('`/api/address/delete/${addressId}`')
})

test('多路径参数', () => {
  const code = pathResolve('/api/address/delete/{userId}/{addressId}')
  expect(code).toBe('`/api/address/delete/${userId}/${addressId}`')
})
