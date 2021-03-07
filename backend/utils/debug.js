const { PROJECT_NAME } = require('../config')
const debug = require('debug')(PROJECT_NAME)

const createCustomDebugger = tag => debug.extend(tag)

module.exports = {
    api: createCustomDebugger('api'),
    error: createCustomDebugger('error'),
    db: createCustomDebugger('db'),
    info: createCustomDebugger('info')
}