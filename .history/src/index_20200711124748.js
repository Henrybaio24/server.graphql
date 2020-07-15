
import express from 'express'
import server from './server'
const app = express()

require

const PORT = 4444

server.applyMiddleware({ app });

app.listen({ port: PORT }, () => {
    console.log(`Servidor en http://localhost:${PORT}${server.graphqlPath}`)
})