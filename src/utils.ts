
export const upperFirstCase = (name: string) => {
  if (!name || !name.length) return ''
  return name[0].toUpperCase() + name.slice(1)
}

export const lintVariable = (name: string) =>
  name.replace(/[^\w]/g, '')
