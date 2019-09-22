const http = require('http')
const https = require('https')

module.exports = function request(url) {
  let client = http
  if (/^https/.test(url)) client = https
  return new Promise((resolve, reject) => {
    client.get(url, {
      headers: { 'user-agent': 'https://github.com/coppyC/api-code-builder' }
    }, res => {
      let data = ''
      const logError = () => {
        console.error(`url: ${url}\n[statusCode: ${res.statusCode}] ${data}`)
        reject()
      }
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        if (~~(res.statusCode / 100) == 3) {
          if (res.headers.location) request(res.headers.location)
          else logError()
          return
        }
        if (res.statusCode !== 200) return logError()
        try {
          resolve(JSON.parse(data))
        } catch (e) {
          resolve(data)
        }
      })
    })
  })
}
