const { SESS_NAME } = require("../config")
const User = require("../models/user")
const { sessionizeUser } = require("../utils/core")
const { login } = require("../validations/user")
const debug = require('../utils/debug')
const { APIError, normaliseError } = require("../utils/error")

module.exports = {
    async save(req) {
        const { email, password } = req.body
        await login.validateAsync({
            email,
            password
        })
        debug.info('User is validated.')
        const user = User.findOne({ email })
        if (user && user.comparePasswords(password)) {
            debug.info(`User@${user.api} has logged in successfully.`)
            const sessionUser = sessionizeUser(user)
            req.session.user = sessionUser
            debug.api('User session is added to the request object.')
            return sessionUser
        }
        const err = new APIError('Invalid login credentials: Wrong email or password', 'UserNotFoundError')
        debug.error(normaliseError(err).toString())
        throw err
    },
    delete(session, res) {
        const user = session.user
        if (user) {
            debug.api('Session user is found.')
            session.destroy(err => {
                if (err) throw err
                res.clearCookie(SESS_NAME)
                debug.api('Session has been removed from the database.')
                res.send(user)
            })
        } else {
            const err = new APIError('There is no active session', 'SessionNotFoundError')
            debug.error(normaliseError(err).toString())
            throw err
        }
    },
    get(user) {
        debug.api('Session user has been obtained.')
        return user || { user }
    }
}