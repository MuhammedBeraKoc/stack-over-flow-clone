const { Router } = require("express");
const SessionController = require("./session");
const UserController = require("./user");

const APIController = Router()

APIController.use('/user', UserController)
APIController.use('/session', SessionController)

module.exports = APIController