require('dotenv').config();
import express from 'express'
import server from './server'
const app = express()

require('./config/db')

const PORT = 4000

server.applyMiddleware({ app });

app.listen({ port: PORT }, () => {
    console.log(`Servidor en http://localhost:${PORT}${server.graphqlPath}`)
})