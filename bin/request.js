const http = require('http')
const https = require('https')

module.exports = function request(url, author) {
  let client = http
  if (/^https/.test(url)) client = https

  const headers = {
    'user-agent': 'https://github.com/coppyC/api-code-builder',
  }
  if (author)
    headers.Authorization = `Basic ${Buffer.from(`${author.username}:${author.password}`).toString('base64')}`

  return new Promise((resolve, reject) => {
    client.get(url, { headers }, res => {
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
