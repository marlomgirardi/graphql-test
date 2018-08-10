import { GraphQLScalarType, Kind } from 'graphql'

export default new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue(value) {
    return new Date(value); // value from the client
  },
  serialize(value) {
    console.log(value)
    return (typeof value === 'string' ? new Date(value) : value).toISOString(); // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10); // ast value is always in string format
    }
    return ast.value;
  }
})
