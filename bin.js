#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const codeBuilder = require('./dist/main.js')
const axios = require('axios').default

const CONFIG_FILE_PATH = './api.config.json'

function safePath(relativePath) {
  const filePath = path.resolve(relativePath)
  const mkdirs = (filePath) => {
    const dirPath = path.dirname(filePath)
    try {
      fs.accessSync(dirPath)
    } catch(e) {
      mkdirs(dirPath)
      fs.mkdirSync(dirPath)
    }
  }
  mkdirs(filePath)
  return filePath
}

async function build(config) {
  console.log('fetch document...')
  const fetchStartTime = Date.now()
  const { data: document } = await axios.get(config.swaggerURL)
  console.log(`fetch complete (${((Date.now() - fetchStartTime)/1000).toFixed(1)}.s)`)
  const code = codeBuilder.buildApi({
    paths: document.paths,
    definitions: document.definitions,
    ...config,
  })
  const outputFilePath = safePath(config.output)
  fs.writeFile(outputFilePath, code, (err) => {
    if (err) console.error(err)
  })
}

function askQuestions() {
  inquirer.prompt([
    {
      message: 'swagger document url',
      name: 'swaggerURL',
      type: 'input',
      validate: (input) => input ? true : 'it\'s reuqired',
    },
    {
      message: 'choose document',
      name: 'group',
      type: 'list',
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
        const { data } = await axios.get(url)
        return Array.from(data).map(item => ({
          name: item.name,
          value: String(item.url).replace(/#.*/, '').replace(/\?.*/, $ => (
            $.replace(/=([^&]*)(?=&?)/g, (_, $1) => '=' + encodeURIComponent($1) )
          )),
        }))
      }
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
      message: 'where\'s axios import from',
      name: 'axiosFrom',
      type: 'input',
      default: 'axios',
    },
    {
      message: 'custom response ?',
      when: ({version}) => version === 'ts',
      name: 'customResponse',
      type: 'input',
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
    console.log(answers)
    if(answers.group) {
      answers.swaggerURL += answers.group
      delete answers.group
    }
    if (answers.saveConfig) {
      delete answers.saveConfig
      delete answers.group
      fs.writeFile(
        CONFIG_FILE_PATH,
        JSON.stringify(answers, null, 2) + '\n',
        err => { if (err) throw err }
      )
    }
    build(answers)
  })
}

function run() {
  fs.readFile(CONFIG_FILE_PATH, (err, data) => {
    if (err) {
      askQuestions()
      return
    }
    const config = JSON.parse(data)
    build(config)
  })
}

run()
