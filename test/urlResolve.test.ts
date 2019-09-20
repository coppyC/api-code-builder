import urlResolve from '../src/urlResolve'

test('没有 path 参数', () => {
  const code = urlResolve('/a/b/c')
  expect(code).toBe(`'/a/b/c'`)
})

test('有 path 参数', () => {
  const code = urlResolve('/a/b/c/{id}')
  expect(code).toBe('`/a/b/c/${path.id}`')
})
