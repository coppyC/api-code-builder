function dataType(property, namespace) {
  const getDefinition = $ref => {
    const type = $ref.replace('#/definitions/', '')
    return namespace
      ? namespace + '.' + type
      : type
  }

  return property.schema && property.schema.$ref
    ? getDefinition(property.schema.$ref)
    : property.$ref
    ? getDefinition(property.$ref)
    : property.items && property.items.type
    ? property.items.type + '[]'
    : property.items && property.items.$ref
    ? getDefinition(property.items.$ref) + '[]'
    : property.format
    ? 'number'
    : property.type === 'file'
    ? 'any'
    : property.type
}

/**
 * @param {Handlebars.HelperOptions} options
 */
module.exports = function(property, options) {
  const {namespace} = options.hash
  return dataType(property, namespace)
}

module.exports.dataType = dataType
