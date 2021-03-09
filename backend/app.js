const express = require('express')
const session = require('express-session')
const connectStore = require('connect-mongo')
const helmet = require('helmet')
const morgan = require('morgan')
const {
    SESS_NAME,
    SESS_SECRET,
    SESS_LIFETIME,
    NODE_ENV,
    PORT,
    API_VERSION
} = require('./config')
const { connect, connection } = require('./repositories/mongodb')
const APIController = require('./controllers/api')
const debug = require('./utils/debug')

const defaultPort = 12345

const applyMiddleware = app => {
    const MongoStore = connectStore(session)
    app.use(express.json())
    app.use(helmet())
    app.use(morgan('tiny'))
    app.use(session({
        name: SESS_NAME,
        secret: SESS_SECRET,
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({
            clientPromise: connection,
            collection: 'session',
            ttl: parseInt(SESS_LIFETIME) / 1000
        }),
        cookie: {
            sameSite: true,
            secure: NODE_ENV === 'production',
            maxAge: parseInt(SESS_LIFETIME)
        }
    }))
    app.use(`/api/${API_VERSION}`, APIController)
    debug.api('Middleware is applied completely 🔢')
}

const listen = app => {
    const listener = app.listen(PORT || defaultPort, () => {
        debug.api(`Listening on port ${listener.address().port} 🧳`)
    })
}

const initApp = async () => {
    try {
        const app = express()
        await connect()
        applyMiddleware(app)
        listen(app)
        return app
    } catch (err) {
        debug.error(err)
    }
}

module.exports = initApp