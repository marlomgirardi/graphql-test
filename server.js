import { ApolloServer } from 'apollo-server'
import { typeDefs, schemaDirectives, resolvers } from './graphql'

const server = new ApolloServer({
  resolvers,
  typeDefs,
  schemaDirectives
});

server
  .listen()
  .then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
