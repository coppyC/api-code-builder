interface ApiConfig {
  paths: any
  version?: 'ts' | 'js'
  definitions?: any
  customResponse?: boolean
  axiosFrom?: string
}

declare const codeBuilder: {
  buildApi(config: ApiConfig): string
}
export default codeBuilder
