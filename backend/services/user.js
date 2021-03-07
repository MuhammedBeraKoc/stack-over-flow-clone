const MongoDBRepository = require("../repositories/mongodb")
const { sessionizeUser } = require("../utils/core")
const { signUp } = require("../validations/user")
const debug = require('../utils/debug')

module.exports = {
    async save(req) {
        const { username, password, email } = req.body
        await signUp.validateAsync({
            username,
            email,
            password
        })
        debug.info(`User is validated.`)
        const user = MongoDBRepository.saveUser(username, email, password)
        debug.api(`User@${user.id} has signed up successfully.`)
        const sessionUser = sessionizeUser(user)
        req.session.user = sessionUser
        debug.api('User session is added to the request object.')
        return sessionUser
    }
}