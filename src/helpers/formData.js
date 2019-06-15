const {isPack} = require('./params')

/**
 * 返回 formData 的代码（如果需要的话）
 * 主分支返回非打包情况代码
 * else 分支返回打包情况代码
 * @param {Parameter[]} paramters
 * @param {Handlebars.HelperOptions} options
 */
module.exports = function(paramters, options) {
  if(!paramters) return
  const fdParamters = paramters.filter(o => o.in === 'formData')
  if(!fdParamters.length) return
  if(!isPack.formData(fdParamters))
    return options.fn({fd: fdParamters})
  else
    return options.inverse()
}
