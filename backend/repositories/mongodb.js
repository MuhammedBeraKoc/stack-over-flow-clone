const mongoose = require('mongoose')
const { MONGO_URL } = require('../config')
const User = require('../models/user')

exports.connection = mongoose.connection
exports.connect = async () => {
    await mongoose.connect(MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }, () => {
        if (err) console.log(err)
        console.log('Connected to the database 🔮')
    })
}
module.exports = {
    async saveUser(username, email, password) {
        const user = new User({
            username,
            email,
            password
        })
        await user.save()
        return save
    }
}