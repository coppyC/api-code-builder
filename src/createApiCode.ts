import format from "./format";
import Typing from "./Typing";
import Groups from "./Groups";
import ParameterGroup from "./ParameterGroup";
import urlResolve from "./urlResolve";
import comment from "./comment";
import formdataCode from "./formdataCode";

interface Config {
  paths: Paths
  version?: 'ts' | 'js'
  definitions?: Definitions
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
  codes.push(`import axios from '${config.axiosFrom || 'axios'}'`)
  codes.push('')
  codes.push('export default {')
  Object.entries(groups).forEach(([name, group]) => {
    codes.push(`${name}: {`)
    Object.entries(group.apis).forEach(([apiName, ctx]) => {
      const parameterGroup = ParameterGroup(ctx.parameters)
      const paramString = ParameterGroup.string(parameterGroup, config.version)
      codes.push(...comment([
        ctx.summary,
        ctx.description && `@explain ${ctx.description}`,
        ...config.version == 'js' ? ParameterGroup.jsdocObj(parameterGroup) : [],
      ]))
      const responseType = config.version === 'ts' && config.customResponse
        ? `: Promise<${config.customResponse}>` : ''
      codes.push(`${apiName}(${paramString})${responseType} {`)
      codes.push(`const method = '${ctx.method}'`)
      const axiosConfig = ParameterGroup.axiosConfig(parameterGroup)
      if(parameterGroup.formData) codes.push(...formdataCode(config.version))
      codes.push(`return axios(${urlResolve(ctx.path)}, { ${axiosConfig} })`)
      codes.push(`},`)
    })
    codes.push(`},`)
  }),
  codes.push('}')
  codes.push('')
  codes.push(...typingCodes)
  codes.push('')
  return format(codes)
}
