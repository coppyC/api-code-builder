/**
 * @param {string} path
 */
module.exports = function(path) {
  path = path.replace(/\{[^{}]+\}/g, $ => '$' + $)
  if(/\$\{.+\}/.test(path))
    return '`' + path + '`'
  else
    return `'${path}'`
}
