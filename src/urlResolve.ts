export default function (url: string) {
  url = url.replace(/\{([^{}]+)\}/g, (_, $1) => `\${path.${$1}}`)
  if(/\$\{.+\}/.test(url))
    return '`' + url + '`'
  else
    return `'${url}'`
}
