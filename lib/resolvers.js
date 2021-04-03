'use strict'

const mutations = require('../lib/mutations')
const queries = require('../lib/queries')
const types = require('../lib/types')

module.exports = {
    Query: queries,
    Mutation: mutations,
    ...types
}