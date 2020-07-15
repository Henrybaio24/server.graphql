
import { ApolloServer } from 'apollo-server-express';
//import typeDefs from './schema/typeDefs';
import resolvers from './resolvers/resolvers';

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

export default server