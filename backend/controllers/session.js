const { Router } = require('express')
const SessionService = require('../services/service-manager').SessionService
const { parseError } = require('../utils/core')

const SessionController = Router()

SessionController.post('/', async (req, res) => {
    try {
        const sessionUser = await SessionService.save(req)
        res.send(sessionUser)
    } catch (err) {
        res.status(400).send(parseError(err))
    }
})

SessionController.delete('/', ({ session }, res) => {
    try {
        SessionService.delete(session, res)
    } catch (err) {
        res.status(422).send(parseError(err))
    }
})

SessionController.get('/', ({ session: { user }}, res) => {
    const sessionUser = SessionService.get(user)
    res.send(sessionUser)
})

module.exports = SessionController