# api-code-builder

[English](./README.md) | 简体中文

使用 swagger 文档来自动构建你的 axios api 代码 (不支持 swagger v3)

生成的代码在 vscode 中具有良好提示
* 在 js 文件中生成 jsdoc
* 在 ts 文件中生成 typing

# 在线体验
https://coppyc.github.io/api-code-builder/

# 开始使用
```
yarn add -D api-code-builder
```
然后添加 npm 脚本 `"build:api": "api-code-builder"` 到 `package.json` 的 `scripts` 字段中
```json
{
  "scripts": {
    "build:api": "api-code-builder"
  }
}
```
最后，运行脚本然后回答一些问题。
enjoy it!
```
yarn build:api
```
![image](https://user-images.githubusercontent.com/25004510/65371821-29733080-dc9a-11e9-8fbd-e4dc70ce706c.png)

# 在 node 中调用 api

```js
const apiCodeBuilder = require('api-code-builder')
const docs = { /** */ } // 你需要自动获取 swagger 的 json 配置

const code = apiCodeBuilder.buildApi({
  paths: docs.paths,
  definitions: docs.definitions,
  // version: 'ts',
  // customResponse: 'any',
  // axiosFrom: './myAxios'
})

console.log(code)
```
