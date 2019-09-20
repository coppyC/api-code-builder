
export const upperFirstCase = (name: string) =>
  name[0].toUpperCase() + name.slice(1)

export const lintVariable = (name: string) =>
  name.replace(/[^\w]/g, '')
