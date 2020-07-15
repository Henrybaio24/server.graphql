require('dotenv').config();
import express from 'express'
import server from './server'
const app = express()

require('./config/db')

server.applyMiddleware({ app });

app.listen({ port: process.env.PORT }, () => {
    console.log(`Servidor en http://localhost:${PORT}${server.graphqlPath}`)
})