require('dotenv').config()

const { makeExecutableSchema } = require('graphql-tools')
const express                  = require('express')
const cors                     = require('cors')
const { graphqlHTTP }          = require('express-graphql')
const { readFileSync }         = require('fs')
const { join }                 = require('path')

const resolvers = require('./lib/resolvers')

const app  = express()
const port = process.env.port || 3000;

// Para setear esta variable se debe:
// Modificar el package.json y agregar un comando que haga:
// NODE_ENV=production node index.js
const isDev = process.env.NODE_ENV !== 'production';

// Definir el Schema
const typeDefs = readFileSync(
    join(__dirname, 'lib', 'schema.graphql'),
    'utf-8'
)

// Configurar el cors
app.use(cors())

const schema = makeExecutableSchema({typeDefs, resolvers})

// Configurar los resolvers
app.use('/api', graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: isDev
}))

app.listen(port, () => {
    console.log(`Server corriendo en puerto: ${port}`);
})
