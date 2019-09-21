function withTab(code: string, tab: number, tabSize = 2) {
  const oneTab = Array(tabSize).fill(' ').join('')
  return Array(tab).fill(oneTab).join('') + code
}

export default function (lines: string[], tabSize = 2) {
  let tab = 0
  return lines
    .map(line => {
      if (line.trim().startsWith('}'))
        tab --
      const code = withTab(line, tab, tabSize)
      if (line.endsWith('{'))
        tab ++
      return code
    })
    .join('\n')
}
