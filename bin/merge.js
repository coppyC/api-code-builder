module.exports = function (...documents) {
  const document = Object.assign({}, documents[0])
  document.definitions = Object.assign({}, ...documents.map(d => d.definitions))
  document.paths = Object.assign({}, ...documents.map(d => d.paths))
  document.tags = documents.reduce((tags, d) => tags.concat(d.tags || []), [])
  return document
}
