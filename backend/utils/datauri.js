import path from 'path'
import DatauriParser from 'datauri/parser.js' // corrected import with .js

const parser = new DatauriParser()

export const getDataUri = (file) => {
  if (!file) return null // guard when no file was uploaded
  const extName = path.extname(file.originalname).toString()
  return parser.format(extName, file.buffer)
}

export default getDataUri