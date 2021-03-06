const mongoose = require('mongoose')
const { MONGO_URL } = require('../config')
const User = require('../models/user')
const debug = require('../utils/debug')
const { normaliseError } = require('../utils/error')

exports.connection = mongoose.connection
exports.connect = async () => {
    await mongoose.connect(MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }, err => {
        if (err) throw err
        debug.api('Connected to the database 🔮')
    })
}
exports.saveUser = async (username, email, password) => {
    const user = new User({
        username,
        email,
        password
    })
    await user.save()
    debug.api(`User with id${user.id} saved to the database.`)
    return save
}