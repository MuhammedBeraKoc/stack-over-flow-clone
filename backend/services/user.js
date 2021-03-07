const MongoDBRepository = require("../repositories/mongodb")
const { sessionizeUser } = require("../utils/core")
const { signUp } = require("../validations/user")

module.exports = {
    async save(req) {
        const { username, password, email } = req.body
        await signUp.validateAsync({
            username,
            email,
            password
        })
        const user = MongoDBRepository.saveUser(username, email, password)
        const sessionUser = sessionizeUser(user)
        req.session.user = sessionUser
        return sessionUser
    }
}