/** @param {string} selectors */
const $ = (selectors) => document.querySelector(selectors)
/** @param {string} selectors */
const $$ = (selectors) => document.querySelectorAll(selectors)
/** @type {{buildApi(config: ApiConfig): string}}  */
const apiCodeBuilder = window.apiCodeBuilder
/** @type {{say(word:string), tell(word:string)}} */
const Animal = window.Animal

const ERROR = '<span style="color:#50bfff">[转换失败] &nbsp;</span>'
function getConfig() {
  return new Promise((res, rej) => {
    try {
      const config = JSON.parse($('#config').value)
      res(config)
    } catch (err) {
      Animal.tell(ERROR + '配置文件应为 JSON 文件')
      rej(err)
    }
    return config
  })
}

const setting = {
  get version() {
    return Array.from($$('input[name="version"]'))
      .find(item => item.checked).value
  }
}

$('#transform-btn').addEventListener('click', async () => {
  const config = await getConfig()
  if(!config.swagger) Animal.tell(ERROR + '目前只支持 swagger 文档')
  const {version} = setting
  $('#api-code').value = apiCodeBuilder.buildApi({
    version,
    paths: config.paths,
    definitions: config.definitions,
  })
  Animal.say('转换成功!')
})
