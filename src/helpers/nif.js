const condition = require('./if')

module.exports = function(...params) {
  /** @type {Handlebars.HelperOptions} */
  const options = params[params.length-1]
  const {fn, inverse} = options
  options.fn = inverse
  options.inverse = fn
  return condition.apply(this, params)
}
