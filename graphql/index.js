import path from 'path'
import fs from 'fs'

import restDirective from './directives/rest'

import queryResolver from './resolvers/query'
import mutationResolver from './resolvers/mutation'
import dateResolver from './resolvers/date'

const folder = 'schemas'

const readDir = (dir) => fs.readdirSync(path.join(__dirname, dir))
const isGraphqlFile = (f) => path.extname(f) === '.graphql'
const getFileContent = (f) => fs.readFileSync(path.join(__dirname, folder, f), 'utf8')

export const typeDefs = readDir(folder)
  .filter(isGraphqlFile)
  .map(getFileContent)


export const schemaDirectives = ({
  rest: restDirective
})

export const resolvers = ({
  Query: queryResolver,
  Mutation: mutationResolver,
  Date: dateResolver
})
