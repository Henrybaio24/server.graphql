import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schema/typeDefs';

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

export default server