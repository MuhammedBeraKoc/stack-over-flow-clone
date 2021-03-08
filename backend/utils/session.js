exports.sessionizeUser = user => ({
    userId: user.id,
    username: user.username
})