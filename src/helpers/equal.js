/**
 * block: p1 === p2 ?
 * @param {Handlebars.HelperOptions} options
 */
module.exports = function(p1, p2, options) {
  if(p1 == p2)
    return options.fn(this)
  else
    return options.inverse(this)
}
