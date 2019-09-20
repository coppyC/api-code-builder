type Type = 'object' | 'string' | 'boolean' | 'array' | 'number' | 'integer' | 'file'
type Method = 'get' | 'post' | 'put' | 'delete' | 'patch'

interface DataType {
  type?: Type
  items?: DataType
  format?: string
  enum?: (string|number)[]
  description?: string

  // reference
  $ref?: string
  originalRef?: string

  // number
  minimum?: number
  maximum?: number
  multipleOf?: number

  // string
  minLength?: number
  maxLength?: number
  pattern?: string
}

interface Properties {
  [propertiy: string]: Property
}

interface Property extends DataType {
}

/** 数据结构 */
interface Definition {
  title?: string
  type: Type
  required?: string[]
  properties?: Properties
}

/** 定义集 */
interface Definitions {
  [name: string]: Definition
}

/** 参数 */
interface Parameter extends DataType {
  name: string
  description?: string
  required?: boolean
  in: 'header' | 'path' | 'query' | 'body' | 'formData'
  schema?: DataType
}

interface Api {
  operationId: string
  summary: string
  description: string
  parameters?: Parameter[]
  tags: [string]
}

interface Tag {
  name: string
  description: string
}

interface Paths {
  [api:string]: {
    [method in Method]: Api
  }
}

interface Docs {
  version: string
  basePath: string
  tags: Tag[]
  swagger: string
  definitions: Definitions
  paths: Paths
}
