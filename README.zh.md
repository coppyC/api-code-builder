# api-code-builder

[English](./README.md) | 简体中文

使用 swagger 文档来自动构建你的 axios api 代码 (不支持 swagger v3)

生成的代码在 vscode 中具有良好提示
* 在 js 文件中生成 jsdoc
* 在 ts 文件中生成 typing

# 在线体验
https://coppyc.github.io/api-code-builder/

# 开始使用
下面使用命令行 cli 的方式 (推荐)
1. 添加npm包
```
yarn add -D api-code-builder
```

2. 添加 npm 脚本

把 `"build:api": "api-code-builder"` 添加到 `package.json` 的 `scripts` 字段中
```json
{
  "scripts": {
    "build:api": "api-code-builder"
  }
}
```
3. 运行脚本

运行脚本然后回答一些问题。
enjoy it!
```
yarn build:api
```
![image](https://user-images.githubusercontent.com/25004510/65371821-29733080-dc9a-11e9-8fbd-e4dc70ce706c.png)

# 其它使用方式
## 在 node 或浏览器中调用 api

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

## 在浏览器中使用 cdn
``` html
<script src="https://unpkg.com/api-code-builder@2.x/dist/main.umd.js"></script>
```
