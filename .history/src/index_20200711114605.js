import express from 'express'

import server from './'

const app = express()

const PORT = 4444

server.applyMiddleware({app});

app.listen({ port: 4000}, () => {
    console.log(`Servidor en http://localhost:4000${PORT}${server.graphqlPath}`)
})