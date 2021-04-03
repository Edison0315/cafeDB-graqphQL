'use strict'

const { graphql, buildSchema } = require('graphql')

// Definir el Schema
const schema = buildSchema(`
    type Query{
        hello: String,
        saludo: String
    }
`)

// Configurar los resolvers
const resolvers = {
    hello: () => {
        return 'hola mundo'
    },
    saludo: () => {
        return 'hola mundo saludo'
    }
}

// Ejecutar el query hello
graphql(schema, '{ saludo }', resolvers).then((data) => {
    console.log(data);
})