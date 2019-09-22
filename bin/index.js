#!/usr/bin/env node

const path = require('path')
const ask = require('./ask')
const request = require('./request')
const saveFile = require('./saveFile')
const apiCodeBuilder = require('../dist/main')

async function fetchDocument(url) {
  const startTime = Date.now()
  console.log('fetch document...')
  const document = await request(url)
  const endTime = Date.now()
  console.log(`fetch complete (${((endTime - startTime)/1000).toFixed(1)}.s)`)
  const throwUrlError = () => {
    throw `url [${url}] wrong, it\'s not a swagger document url`
  }
  if (typeof document !== 'object' || !document.paths)
    throwUrlError()
  return document
}

async function run () {
  const configPath = path.resolve('api.config.json')
  let config = {}
  try {
    config = require(configPath)
    console.log('found the config file, don\'t ask again.')
  } catch (e) {
    config = await ask()
  }
  const document = await fetchDocument(config.swaggerURL)
  const code = apiCodeBuilder.buildApi({
    paths: document.paths,
    definitions: document.definitions,
    ...config,
  })
  saveFile(config.output, code)
}

run()
