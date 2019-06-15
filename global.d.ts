interface Definition {
  title: string
  type: DataType
  properties: {
    [propertiy: string]: {
      type: DataType
      items?: Schema
      format?: 'int64' | 'int32'
    }
  }
}

interface Parameter {
  in: 'header' | 'path' | 'query' | 'body' | 'formData'
  name: string
  required: boolean
  description: string
  schema?: any
  type?: string
}
