import { upperFirstCase, lintVariable } from './utils'

interface Groups {
  [group: string]: {
    apis: {
      [api: string]: Api & {
        path: string
        method: string
      }
    }
    description?: string
  }
}

function getGroupNameFrom(pathName: string) {
  return pathName.split('/').filter(x => x)[0] || 'root'
}
function getApiNameFrom(pathName: string) {
  return pathName
    .split('/')
    .filter(x => x)
    .slice(1)
    .map(item => item.replace(/\{(.*)\}/, (_, $1) => `By${upperFirstCase($1)}`))
    .map(lintVariable)
    .map(upperFirstCase)
    .join('')
    || ''
}

function initGroup(pathNames: string[]) {
  const groups: Groups = {}
  const groupNames = new Set<string>()
  pathNames.forEach(pathname => {
    groupNames.add(getGroupNameFrom(pathname))
  })
  groupNames.forEach(groupName => {
    groups[groupName] = { apis: {} }
  })
  return groups
}


export default function (paths: Paths, tags?: Tag[]): Groups {
  const groups = initGroup(Object.keys(paths))
  Object.keys(paths).forEach(path => {
    const groupName = getGroupNameFrom(path)
    const group = groups[groupName]
    Object.entries(paths[path]).forEach(([method, ctx]) => {
      group.apis[method + getApiNameFrom(path)] = {
        path, method, ...ctx
      }
    })
  })

  return groups
}
