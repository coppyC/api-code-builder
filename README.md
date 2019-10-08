# api-code-builder

English | [简体中文](./README.zh.md)

build your axios code from swagger document (not support swagger v3)

and have good Intelligence in vscode
* create jsdoc in js
* create typing in ts

# online experience
https://coppyc.github.io/api-code-builder/

# get started
```
yarn add -D api-code-builder
```
then add npm script `"build:api": "api-code-builder"` to your `package.json` scripts
```json
{
  "scripts": {
    "build:api": "api-code-builder"
  }
}
```
finally, run and answer some questions, enjoy it!
```
yarn build:api
```
![image](https://user-images.githubusercontent.com/25004510/65371821-29733080-dc9a-11e9-8fbd-e4dc70ce706c.png)

# other ways to use
## use in node or browser with npm

```js
const apiCodeBuilder = require('api-code-builder')
const docs = { /** */ } // you need to get the swagger document by yourself

const code = apiCodeBuilder.buildApi({
  paths: docs.paths,
  definitions: docs.definitions,
  // version: 'ts',
  // customResponse: 'any',
  // axiosFrom: './myAxios'
})

console.log(code)
```

## use in browser with cdn
``` html
<script src="https://unpkg.com/api-code-builder@2.x/dist/main.umd.js"></script>
```

# new version plan
- a adapter from swagger to axios in running time.
- output the swagger.json file as the adapter input
- only product js + .d.ts at once then only update without js
