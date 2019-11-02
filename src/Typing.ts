import DataType from './DataType'
import { lintVariable } from './utils'

export default function (definitions: Swagger.Definitions, version?: 'js' | 'ts'): string[] {
  if (version === 'js') return jsdocTypedef(definitions)
  const lines: string[] = []
  Object.entries(definitions).forEach(([key, definition]) => {
    lines.push(`export interface ${lintVariable(key)} {`)
    definition.properties && Object.entries(definition.properties).forEach(([key, property]) => {
      if (property.description && property.description !== key)
        lines.push(`/** ${property.description} */`)
      const required = definition.required && definition.required.includes(key)
        ? '' : '?'
      lines.push(`${key}${required}: ${DataType(property)}`)
    })
    lines.push(`}`)
  })
  return lines
}

export function jsdocTypedef(definitions: Swagger.Definitions): string[] {
  const lines: string[] = []
  Object.entries(definitions).forEach(([key, definition]) => {
    lines.push('/**')
    lines.push(` * @typedef ${lintVariable(key)}`)
    definition.properties && Object.entries(definition.properties).forEach(([key, property]) => {
      if (!(definition.required && definition.required.includes(key)))
        key = `[${key}]`
      let line = ` * @property {${DataType(property)}} ${key}`
      if (property.description && property.description !== key)
        line += ' ' + property.description
      lines.push(line)
    })
    lines.push(` */`)
  })
  return lines
}
