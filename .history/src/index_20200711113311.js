import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express';
import { typeDefs, resolvers } from './schema';

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

cons

server.applyMiddleware({app});

app.listen({ port: 4000}, () => {
    console.log(`Servidor en http://localhost:4000${server.graphqlPath}`)
})