const fs = require('fs')
const path = require('path')

function SafePath(relativePath) {
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

module.exports = function (filePath, content, callback) {
  fs.writeFile(
    SafePath(filePath),
    content,
    {encoding: 'utf-8'},
    (err) => {
      if (err) return console.error(err)
      callback && callback
    }
  )
}
