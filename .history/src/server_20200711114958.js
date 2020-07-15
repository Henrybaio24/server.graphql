import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema/typeDefs';


const server = new ApolloServer({
    typeDefs,
    resolvers,
});

export default server