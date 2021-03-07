const { Router } = require('express')
const UserService = require('../services/user')
const { parseError } = require('../utils/core')

const UserController = Router()

UserController.post('/', async (req, res) => {
    try {
        const sessionUser = await UserService.save(req)
        res.send(sessionUser)
    } catch (err) {
        res.status(400).send(parseError(err))
    }
})

module.exports = UserController