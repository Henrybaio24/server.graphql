import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema/typeDefs';
import resolvers from 

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

export default server