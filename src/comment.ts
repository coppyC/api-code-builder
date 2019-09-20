export default function (lines: string[]): string[] {
  lines = lines.filter(x => x)
  if (!lines.length) return []
  if (lines.length === 1) return [`/** ${lines[0]} */`]
  return [
    '/**',
    ...lines.map(line => (
      ` * ${String(line).replace(/\n/g, ' ').trim()}`
    )),
    ' */',
  ]
}
