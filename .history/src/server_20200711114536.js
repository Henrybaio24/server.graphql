import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schema';

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

export