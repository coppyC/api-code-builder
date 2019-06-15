/**
 * block: JSON.stringify
 * hash
 *  - filter: stirng stirng stirng
 * @param {Handlebars.HelperOptions} options
 */
module.exports = function(obj, options) {
  /** @type {string[]} */
  const filters = options.hash.filter
    ? options.hash.filter.split(' ')
    : null
  let json = ''
  for(let key in obj) {
    if(filters && !filters.includes(key))
      continue
    if(['', undefined, null].includes(obj[key]))
      continue
    const value = typeof obj[key] === 'object'
      ? JSON.stringify(obj[key])
      : typeof obj[key] === 'string'
      ? `"${obj[key]}"`
      : obj[key]
    json += options.fn({ key, value })
  }
  return json
}
