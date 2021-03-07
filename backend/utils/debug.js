const $debug = require('debug')
const { PROJECT_NAME } = require('../config')

const createCustomDebugger = tag => $debug(`${PROJECT_NAME}:${tag}`)

module.exports = {
    api: createCustomDebugger('api'),
    error: createCustomDebugger('error')
}