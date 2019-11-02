import DataType from "./DataType"
import { lintVariable, upperFirstCase } from "./utils"
import comment from "./comment"

type Parameter = Swagger.Parameter
interface ParameterGroup {
  path?: Parameter[]
  params?: Parameter[]
  formData?: Parameter[]
  data?: Parameter
}

function ParameterDataType(parameter: Parameter) {
  return DataType(parameter.schema || parameter)
}

export default function ParameterGroup(parameters: Parameter[] = []) {
  const p: ParameterGroup = {
    path: [],
    params: [],
    formData: [],
  }
  parameters.forEach(parameter => {
    switch (parameter.in) {
      case 'path':
        p.path!.push(parameter)
        break
      case 'query':
        p.params!.push(parameter)
        break
      case 'body':
        p.data = parameter
        break
      case 'formData':
        p.formData!.push(parameter)
    }
  })
  if (p.path!.length === 0)
    delete p.path
  if (p.params!.length === 0)
    delete p.params
  if (p.formData!.length === 0)
    delete p.formData
  return p
}

ParameterGroup.string = function (parameterGroup: ParameterGroup, baseTypeName: string, version?: 'ts' | 'js') {
  if (version === 'js')
    return Object.keys(parameterGroup).join(', ')
  return Object.entries(parameterGroup)
    .map(([name, parameters]) => name === 'data'
      ? `data: ${ParameterDataType(parameters)}`
      : `${name}: ${(baseTypeName + upperFirstCase(name))}`
    )
    .join(', ')
}
ParameterGroup.jsdocObj = function (parameterGroup: ParameterGroup) {
  return Object.entries(parameterGroup)
    .map(([name, parameters]) => name === 'data'
      ? `@param {${ParameterDataType(parameters)}} ${name}`
      : `@param {{ ${createTypingSnippet(parameters)} }} ${name}`
    )
}

ParameterGroup.axiosConfig = function (parameterGroup: ParameterGroup) {
  const axiosConfig: string[] = ['method']
  if(parameterGroup.params) axiosConfig.push('params')
  if(parameterGroup.formData || parameterGroup.data) axiosConfig.push('data')
  return axiosConfig.join(', ')
}

function required(required?: boolean) {
  if(required) return ''
  return '?'
}

function createTypingSnippet(parameters: Parameter[]) {
  return parameters.map(parameter => (
    `${parameter.name}${required(parameter.required)}: ${ParameterDataType(parameter)}`
  )).join(', ')
}

export function TypingfromParameters(typeName: string, parameters: Parameter[], version?: 'js' | 'ts'): string[] {
  typeName = lintVariable(typeName)
  if (version === 'js') {
    return comment([
      `@typedef ${typeName}`,
      ...parameters.map(parameter => (
        `@property {${ParameterDataType(parameter)}} ${parameter.name}`
      ))
    ])
  }
  return [
    `export interface ${typeName} {`,
    ...parameters.map(parameter => (
      `${parameter.name}${required(parameter.required)}: ${ParameterDataType(parameter)}`
    )),
    '}'
  ]
}
