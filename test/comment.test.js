const template = require('../src/partials/comment.hbs')
const utils = require('./utils')

test('无描述', () => {
  const code = template({
    summary: "管理员修改密码",
  })
  const expectCode = `/** 管理员修改密码 */`
  expect(code).toBe(utils.format(expectCode))
})

test('有描述', () => {
  const code = template({
    summary: "管理员修改密码",
    description: "'\"特殊字符不转译</>",
  })
  const expectCode = `
    /** 管理员修改密码
     * @参数说明 '\"特殊字符不转译</>
     */
  `
  expect(code).toBe(utils.format(expectCode))
})
