// TODO: 分类 to reduce code
export default function () {
  return [
    'const data = new FormData()',
    'Object.entries(formData).forEach(([name, value]) => {',
    'if (value === undefined) return',
    'if (value instanceof Array)',
    '  value.forEach(value => data.append(name, value))',
    'else',
    '  data.append(name, value)',
    '})',
  ]
}
