module.exports = function(...params) {
  /** @type {Handlebars.HelperOptions} */
  const options = params.pop()
  const getVar = param =>
    param.replace(/\{(\S+)\}/g, ($0, $1) => `'${this[$1]}'`)
  const evalConfition = () =>
    eval(params .map(param =>
      typeof param === 'string'
      ? getVar(param)
      : typeof param === 'object'
      ? true
      : param )
      .join(''))
  const condition = params.length === 1
    ? params[0]
    : evalConfition()
  if(condition)
    return options.fn(this)
  else
    return options.inverse(this)
}
