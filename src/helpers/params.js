const {dataType} = require('./dataType')

/**
 * api 参数分类: path参数、query参数、body参数、formData参数
 * @param {Parameter} paramter
 */
function Type(paramter) {
  return (paramter.required ? ':' : '?:') + ' '
    + dataType(paramter, 'D')
}

/**
 * api 参数分类: path参数、query参数、body参数、formData参数
 * @param {Parameter[]} paramters
 */
function sort(paramters) {
  /** @type {Parameter[]} */
  const pathParamters = []
  /** @type {Parameter[]} */
  const queryParamters = []
  /** @type {Parameter} */
  let bodyParamter
  /** @type {Parameter[]} */
  const formDataParamters = []
  /** @type {Parameter[]} */
  paramters && paramters.forEach(paramter => {
    if(paramter.in === 'header') return
    if(paramter.in === 'path')
      pathParamters.push(paramter)
    if(paramter.in === 'query')
      queryParamters.push(paramter)
    if(paramter.in === 'formData')
      formDataParamters.push(paramter)
    if(paramter.in === 'body')
      bodyParamter = paramter
  })
  const sortRequired = (a,b) => !a.required && b.required ? 1 : -1
  queryParamters.sort(sortRequired)
  formDataParamters.sort(sortRequired)
  return {
    pathParamters,
    queryParamters,
    formDataParamters,
    bodyParamter,
  }
}


const isPack = {
  /** @param {Parameter[]} paramters */
  query(paramters) {
    return paramters.filter(paramter => !paramter.required).length > 1
      || paramters.length > 3
  },
  /** @param {Parameter[]} paramters */
  formData(paramters) {
    return paramters.some(paramter => !paramter.required)
      || paramters.length > 3
  }
}

/**
 * 返回函数参数的声明代码
 * path 参数视为必选参数，独立出来
 * body 参数只有一个，无需再次打包
 * formData 参数打包存放
 * query 参数若存在 2 个及以上的可选参，则打包名为 query 的参数，否则独立（若只有一个可选参数则可选参放最后）
 * @param {Parameter[]} paramters
 * @param {Handlebars.HelperOptions} options
 */
function definition(paramters, version='ts') {
  function insertParamter(paramter) {
    let param = paramter.name
    if(version === 'ts')
      param += Type(paramter)
    params.push(param)
  }
  function insertParamters(paramters) {
    for(let paramter of paramters)
      insertParamter(paramter)
  }
  /**
   * @param {string} name
   * @param {Parameter[]} paramters
   */
  function packParamters(name, paramters) {
    let param = name
    if(version === 'ts') {
      if(paramters.every(o => !o.required))
        param += '?'
      param += ': { '
      + paramters.map(o => o.name + Type(o)).join(', ')
      + ' }'
    }
    params.push(param)
  }
  if(!paramters || paramters.every(item => item.in==='header'))
    return ''
  const {
    pathParamters,
    queryParamters,
    bodyParamter,
    formDataParamters,
  } = sort(paramters)
  const params = []

  insertParamters(pathParamters)

  if(bodyParamter)
    insertParamter(bodyParamter)

  if(!isPack.formData(formDataParamters))
    insertParamters(formDataParamters)
  else
    packParamters('formData', formDataParamters)

  if(!isPack.query(queryParamters))
    insertParamters(queryParamters)
  else
    packParamters('query', queryParamters)

  return params.join(', ')
}

/**
 * 返回函数参数的使用代码
 * @param {Parameter[]} paramters
 * @param {string} method
 */
function use(paramters, method) {
  const {
    queryParamters,
    bodyParamter,
    formDataParamters,
  } = sort(paramters)
  const params = []
  if(formDataParamters.length > 0) {
    params.push('fd')  // 在 formData.hbs 中使用了这个命名，无论是否被打包
  } else if(bodyParamter) {
    params.push(bodyParamter.name)
  }
  if(queryParamters.length > 0) {
    if(!params[0] && ['post','put','patch'].includes(method))
      params.push(null)
    if(!isPack.query(queryParamters))
      params.push(`{ params: { ${
        queryParamters.map(o => o.name).join(', ')
      } } }`)
    else
      params.push(`{ params: query }`)
  }
  return params
    .map(s => ', ' + s)
    .join('')
}

/**
 * @param {Parameter[]} paramters
 * @param {Handlebars.HelperOptions} options
 */
module.exports = function(paramters, options) {
  if(!paramters) return
  const {type} = options.hash
  if(type==='definition')
    return definition(paramters, options.hash.version)
  if(type==='use')
    return use(paramters, options.hash.method)
  console.error('没有传类型')
}

module.exports.sort = sort
module.exports.isPack = isPack
