exports.format = function format(code='', indent = 4) {
  let space = ''
  for(let i=0; i<indent; i++) space += ' '
  return code.trim().split('\n')
    .map(line => line.replace(new RegExp(`^${space}`), ''))
    .join('\n')
    + '\n'
}
