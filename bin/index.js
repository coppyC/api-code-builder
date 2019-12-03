#!/usr/bin/env node

const path = require('path')
const merge = require('./merge')
const ask = require('./ask')
const request = require('./request')
const saveFile = require('./saveFile')
const apiCodeBuilder = require('../dist/main')

async function fetchDocument(url, author) {
  const startTime = Date.now()
  console.log(`fetch document ${decodeURIComponent(url)} ...`)
  const document = await request(url, author)
  const endTime = Date.now()
  console.log(`fetch ${decodeURIComponent(url)} complete (${((endTime - startTime)/1000).toFixed(1)}.s)`)
  const throwUrlError = () => {
    throw `url [${url}] wrong, it\'s not a swagger document url`
  }
  if (typeof document !== 'object' || !document.paths)
    throwUrlError()
  return document
}

function checkBasePath(documents) {
  if (documents.length === 0) {
    console.error('you need to choose a document at least')
    return
  }
  const basePath = documents[0].basePath
  const host = documents[0].host
  return Array.from(documents).every(doc => (
    doc.basePath === basePath && doc.host === host
  ))
}

async function run () {
  const configPath = path.resolve('api.config.json')
  let config = {}
  try {
    config = require(configPath)
    console.log('found the config file')
  } catch (e) {
    config = await ask()
  }
  if (!(config.swaggerURL instanceof Array))
    config.swaggerURL = [config.swaggerURL]
  const documents = await Promise.all(
    Array.from(config.swaggerURL).map(url => (
      fetchDocument(url, config.basicAuthor ? {
        username: config.username,
        password: config.password,
      } : undefined)
    ))
  )

  if (!checkBasePath(documents))
    return console.error('dont \' have the same baseURL or host, can\'t merge the documents.')

  const document = merge(...documents)

  if (config.addHostToBaseUrl)
    document.basePath = `${config.protocol || 'https'}://${document.host}${document.basePath}`

  const code = apiCodeBuilder.buildApi({
    paths: document.paths,
    baseURL: document.basePath,
    definitions: document.definitions,
    ...config,
  })
  saveFile(config.output, code)
  console.log('save api file to here successful: ', path.resolve(config.output))
}

run()
