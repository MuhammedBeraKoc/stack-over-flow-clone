const { sessionizeUser } = require("../utils/session")
const { signUp } = require("../validations/user")
const debug = require('../utils/debug')
const { injectContext } = require("../utils/context")
const Mongo = require('../repositories/mongodb')

module.exports = User => injectContext(User)({
    async save(req) {
        const { username, password, email } = req.body
        await signUp.validateAsync({
            username,
            email,
            password
        })
        debug.api(`User is validated.`)
        const user = await Mongo.users.save(username, email, password)
        debug.api(`User@${user.id} has signed up successfully.`)
        const sessionUser = sessionizeUser(user)
        req.session.user = sessionUser
        debug.api('User session is added to the request object.')
        return sessionUser
    }
})