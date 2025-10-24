export const getAssetPath = (path: string) => {
  const basePath = process.env.NODE_ENV === 'production' ? '/bo' : ''
  return `${basePath}${path}`
}
