import Groups from "../src/Groups";
import docs from './docs.json';

test('base test', () => {
  const groups = Groups({ '/admin/login': docs.paths['/admin/login'] } as any)
  expect(Object.keys(groups)).toEqual(['admin'])
  const apis = groups.admin.apis
  expect(Object.keys(apis)).toEqual(['postLogin'])
  expect(apis.postLogin.path).toBe('/admin/login')
  expect(apis.postLogin.method).toBe('post')
})

test('with path var', () => {
  const groups = Groups({ '/admin/login/{id}': docs.paths['/admin/login'] } as any)
  expect(Object.keys(groups.admin.apis)).toEqual(['postLoginById'])
})
