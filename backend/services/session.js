const { SESS_NAME } = require("../config")
const User = require("../models/user")
const { sessionizeUser } = require("../utils/core")
const { login } = require("../validations/user")

module.exports = {
    async save(req) {
        const { email, password } = req.body
        await login.validateAsync({
            email,
            password
        })
        const user = User.findOne({ email })
        if (user && user.comparePasswords(password)) {
            const sessionUser = sessionizeUser(user)
            req.session.user = sessionUser
            return sessionUser
        }
        throw new Error('Invalid login credentials')
    },
    delete(session, res) {
        const user = session.user
        if (user) {
            session.destroy(err => {
                if (err) throw err
                res.clearCookie(SESS_NAME)
                res.send(user)
            })
        } else {
            throw new Error('There is no active session')
        }
    },
    get(user) {
        return user || { user }
    }
}