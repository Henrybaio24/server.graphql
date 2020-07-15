import fs from 'fs'
import path from 'path'
import { ApolloServer } from 'apollo-server-express'
//import typeDefs from './schema/typeDefs';
import resolvers from './resolvers/resolvers'

const typeDefs = fs 
.

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

export default server