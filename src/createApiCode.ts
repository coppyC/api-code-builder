import format from "./format";
import Typing from "./Typing";
import Groups from "./Groups";
import ParameterGroup, { TypingfromParameters } from "./ParameterGroup";
import urlResolve from "./urlResolve";
import comment from "./comment";
import formdataCode from "./formdataCode";
import { upperFirstCase } from "./utils";
import DataType from "./DataType";

interface Config {
  paths: Swagger.Paths
  version?: 'ts' | 'js'
  baseURL?: string
  definitions?: Swagger.Definitions
  customResponse?: string
  axiosFrom?: string
}

export default function (config: Config) {
  if (!config.version) config.version = 'js'
  const typingCodes: string[] = []
  if (config.definitions)
    typingCodes.push(...Typing(config.definitions, config.version))
  const groups = Groups(config.paths)
  const codes: string[] = []
  codes.push(
    '// this file may be overwrite by api code builder, don\'t change it. Go to api.config.json to config output file',
    '// 本文件可能会被 api code builder 重写覆盖，请勿修改它。配置 api.config.json 来修改生成文件',
    '/* eslint-disable */',
  )
  codes.push(`import axios from '${config.axiosFrom || 'axios'}'`, '')
  if (config.version === 'ts') codes.push('import { AxiosRequestConfig, AxiosPromise } from \'axios\'')
  if(config.baseURL && !config.axiosFrom)
    codes.push(`axios.defaults.baseURL = '${config.baseURL}'`, '')
  codes.push(
    'if (!axios.defaults.baseURL)',
    `  axios.defaults.baseURL = '${config.baseURL}'\n`,
  )
  codes.push('export default {')
  Object.entries(groups).forEach(([groupName, group], i, {length}) => {
    codes.push(`${groupName}: {`)
    Object.entries(group.apis).forEach(([apiName, ctx], i, {length}) => {
      const parameterGroup = ParameterGroup(ctx.parameters)
      codes.push(...comment([
        ctx.summary,
        ctx.description && `@explain ${ctx.description}`,
        ...config.version == 'js' ? ParameterGroup.jsdocObj(parameterGroup) : [],
      ]))
      const baseTypeName = upperFirstCase(groupName) + upperFirstCase(apiName)
      if (config.version === 'ts') Object.entries(parameterGroup).forEach(([paramName, parameters]) => {
        if (paramName === 'data') return
        typingCodes.push(...TypingfromParameters(
          baseTypeName + upperFirstCase(paramName),
          parameters,
          config.version
        ))
      })
      const AXIOS_CONFIG_NAME = 'axiosConfig'
      const paramString = [
        ParameterGroup.string(parameterGroup, baseTypeName, config.version),
        config.version === 'ts' ? `${AXIOS_CONFIG_NAME}?: AxiosRequestConfig` : AXIOS_CONFIG_NAME
      ].filter(x => x).join(', ')
      let responseType: string
      if (!ctx.responses || !ctx.responses['200']) {
        responseType = ''
      } else {
        responseType = DataType(ctx.responses['200'].schema)
        if (config.customResponse) responseType = `Promise<${config.customResponse.replace('RESPONSE', responseType)}>`
        else responseType = `AxiosPromise<${responseType}>`
        if (config.version === 'ts') responseType = `: ${responseType}`
        else responseType = ''
      }
      codes.push(`${apiName}(${paramString})${responseType} {`)
      codes.push(`const method = '${ctx.method}'`)
      const axiosConfig = ParameterGroup.axiosConfig(parameterGroup)
      if(parameterGroup.formData) codes.push(...formdataCode())
      codes.push(`return axios(${urlResolve(ctx.path)}, { ${axiosConfig}, ...${AXIOS_CONFIG_NAME} })` + (config.customResponse ? ' as any' : ''))
      codes.push('}' + (length !== i+1 ? ',' : ''))
    })
    codes.push('}' + (length !== i+1 ? ',' : ''))
  }),
  codes.push('}\n')
  codes.push(...typingCodes, '')
  return format(codes)
}
