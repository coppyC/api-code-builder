const inquirer = require('inquirer')
const request = require('./request')
const saveFile = require('./saveFile')

module.exports = function () {
  return new Promise(resolve => {
    inquirer.prompt([
      {
        message: 'swagger document url',
        name: 'swaggerURL',
        type: 'input',
        validate(input) {
          if (!input) return 'it\'s reuqired'
          if (!/https?/.test(input)) return 'it need to start with http or https'
          return true
        },
      },
      {
        message: 'need basic authorization?',
        name: 'basicAuthor',
        type: 'confirm',
        default: false,
      },
      {
        message: 'username:',
        name: 'username',
        when(answers) { return answers.basicAuthor },
        type: 'input',
      },
      {
        message: 'password:',
        name: 'password',
        when(answers) { return answers.basicAuthor },
        type: 'password',
      },
      {
        message: 'choose documents',
        name: 'group',
        type: 'checkbox',
        when(answers) {
          if (/\.html([?#].*)?$/.test(answers.swaggerURL)) {
            answers.swaggerURL = String(answers.swaggerURL)
              .replace(/(https?:\/\/[^/]*\/[^/]*).*/, '$1')
            return true
          }
          return false
        },
        async choices({swaggerURL}) {
          const url = swaggerURL + '/swagger-resources'
          const resources = await request(url)
          if (!(resources instanceof Array)) throw `${swaggerURL} may not a swagger document url`
          return Array.from(resources).map(item => ({
            name: item.name,
            value: swaggerURL + String(item.url).replace(/#.*/, '').replace(/\?.*/, $ => (
              $.replace(/=([^&]*)(?=&?)/g, (_, $1) => '=' + encodeURIComponent($1) )
            )),
          }))
        },
      },
      {
        message: 'what\'s kind of the file?',
        name: 'version',
        type: 'list',
        choices: [
          {name: 'javascript', value: 'js'},
          {name: 'typescript', value: 'ts'},
        ]
      },
      {
        message: 'where to output?',
        name: 'output',
        type: 'input',
        default: ({version}) => 'src/api.' + version,
      },
      {
        message: 'need to save a config file?',
        name: 'saveConfig',
        type: 'confirm',
        default: true
      },
    ]).then(answers => {
      answers = Object.assign({}, answers, {
        axiosFrom: '',
        customResponse: '',
        addHostToBaseUrl: false,
        protocol: 'https',
      })
      if(answers.group) {
        answers.swaggerURL = answers.group
        delete answers.group
      }
      if(typeof answers.swaggerURL === 'string')
        answers.swaggerURL = [ answers.swaggerURL ]
      if (answers.saveConfig) {
        delete answers.saveConfig
        delete answers.group
        saveFile(
          'api.config.json',
          JSON.stringify(answers, null, 2) + '\n',
          () => console.log('save config file success: api.config.json')
        )
      }
      resolve(answers)
    })
  })

}
