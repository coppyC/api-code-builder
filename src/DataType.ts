import { lintVariable } from "./utils"

const getRef = ($ref: string) =>
  lintVariable($ref.replace(/^.*\/([^/]*)$/, '$1'))

const getEnums = (enums: any[]) =>
  `(${enums.map(item => (
    typeof item === 'string'
      ? `'${item}'` : item
  )).join('|')})`

export default function DataType(property?: Swagger.Schema): string {
  if (!property) return 'any'
  return property.$ref
    ? getRef(property.$ref)
    : property.items
      ? DataType(property.items) + '[]'
      : property.enum
        ? getEnums(property.enum)
        : property.type === 'integer'
          ? 'number'
          : property.type === 'file'
            ? 'any'
            : property.type === 'object'
            ? 'any'
            : property.type || 'any'
}
