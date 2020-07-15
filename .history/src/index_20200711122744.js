import express from 'express'

import server from './server'

const app = express()

const PORT = 4444

server.applyMiddleware({app});

app.listen({ port: 4000}, () => {
    console.log(`Servidor en http://localhost:${PORT}${server.graphqlPath}`)
})