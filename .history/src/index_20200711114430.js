import express from 'express'
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schema';

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const app = express()

const PORT = 4444

server.applyMiddleware({app});

app.listen({ port: 4000}, () => {
    console.log(`Servidor en http://localhost:4000${PORT}${server.graphqlPath}`)
})