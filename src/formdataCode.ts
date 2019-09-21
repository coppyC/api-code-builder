export default function (version?: 'js' | 'ts') {
  return [
    'const data = new FormData()',
    'for(let name in formData)',
    `  data.append(name, ${
      version === 'ts'
        ? '(formData as any)'
        : 'formData'
    }[name])`,
  ]
}
