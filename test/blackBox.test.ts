import builder from '../src/main'
import docs from './docs.json'

test('black box', () => {
  const code = builder.buildApi({
    paths: docs.paths as any,
    version: 'ts',
    baseURL: docs.basePath,
    customResponse: 'RESPONSE[\'data\']'
  })
  expect(code).toMatchSnapshot()
})
