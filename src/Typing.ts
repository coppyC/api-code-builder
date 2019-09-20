import DataType from './DataType'
import { lintVariable } from './utils'

export default function (definitions: Definitions, version?: 'js' | 'ts'): string[] {
  if (version === 'js') return jsdocTypedef(definitions)
  const lines: string[] = []
  Object.entries(definitions).forEach(([key, defintion]) => {
    lines.push(`export interface ${lintVariable(key)} {`)
    defintion.properties && Object.entries(defintion.properties).forEach(([key, property]) => {
      lines.push(`${key}?: ${DataType(property)}`)
    })
    lines.push(`}`)
  })
  return lines
}

export function jsdocTypedef(definitions: Definitions): string[] {
  const lines: string[] = []
  Object.entries(definitions).forEach(([key, defintion]) => {
    lines.push('/**')
    lines.push(` * @typedef ${lintVariable(key)}`)
    defintion.properties && Object.entries(defintion.properties).forEach(([key, property]) => {
      lines.push(` * @property {${DataType(property)}} ${key}`)
    })
    lines.push(` */`)
  })
  return lines
}
