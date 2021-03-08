const User = require('../models/user');

module.exports = {
    UserService: require('./user')(User),
    SessionService: require('./session')(User)
}