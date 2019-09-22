interface ApiConfig {
  paths: any
  version?: 'ts' | 'js'
  definitions?: any
  baseURL?: string
  customResponse?: string
  axiosFrom?: string
}

declare const codeBuilder: {
  buildApi(config: ApiConfig): string
}
export default codeBuilder
